/*
MIT License
© 2024 Lifecast Incorporated
https://github.com/fbriggs/lifecast_public/blob/main/web/lifecast_res/GestureControlModule.js
*/

import {Vector3, Matrix4} from './three178.module.min.js';

class GestureControlModule {
  constructor() {
    this.leftHandPosition = new Vector3();
    this.rightHandPosition = new Vector3();
    this.prevLeftHandPosition = new Vector3();
    this.prevRightHandPosition = new Vector3();
    this.isLeftPinching = false;
    this.isRightPinching = false;

    this.currentScale = 1.0;
    this.currentRotY = 0;
    this.currentTranslation = new Vector3();
  }

  reset() {
    this.currentScale = 1.0;
    this.currentRotY = 0;
    this.currentTranslation.set(0, 0, 0);
    this.leftHandPosition.set(0, 0, 0);
    this.rightHandPosition.set(0, 0, 0);
    this.prevLeftHandPosition.set(0, 0, 0);
    this.prevRightHandPosition.set(0, 0, 0);
    this.isLeftPinching = false;
    this.isRightPinching = false;
  }

  updateLeftHand(pos) {
    this.leftHandPosition.set(pos.x, pos.y, pos.z);
  }

  updateRightHand(pos) {
    this.rightHandPosition.set(pos.x, pos.y, pos.z);
  }

  leftPinchStart() {
    this.isLeftPinching = true;
  }

  leftPinchEnd() {
    this.isLeftPinching = false;
  }

  rightPinchStart() {
    this.isRightPinching = true;
  }

  rightPinchEnd() {
    this.isRightPinching = false;
  }

  getHandAngle(left, right) {
    let dz = left.z - right.z;
    let dx = left.x - right.x;
    if (dx === 0 && dz === 0) {
      return 0;
    }
    return -Math.atan2(dz, dx);
  }

  normalizeAngle(angle) {
    if (angle > Math.PI) {
      angle -= 2 * Math.PI;
    } else if (angle < -Math.PI) {
      angle += 2 * Math.PI;
    }
    return angle;
  }

  getCurrentTransformation() {
    let transformationMatrix = new Matrix4();

    // Create a scaling matrix
    let scaleMatrix = new Matrix4().makeScale(this.currentScale, this.currentScale, this.currentScale);

    // Create a rotation matrix
    let rotationMatrix = new Matrix4().makeRotationY(this.currentRotY);

    // Create a translation matrix
    let translationMatrix = new Matrix4().makeTranslation(
      this.currentTranslation.x,
      this.currentTranslation.y,
      this.currentTranslation.z
    );

    transformationMatrix.multiply(translationMatrix);
    transformationMatrix.multiply(scaleMatrix);
    transformationMatrix.multiply(rotationMatrix);

    return transformationMatrix;
  }

  updateTransformation(world_group_position, mesh_position) {
    if (this.isLeftPinching && this.isRightPinching) {
      // Use the average of both left and right translation
      let translationDeltaLeft = this.leftHandPosition.clone().sub(this.prevLeftHandPosition);
      let translationDeltaRight = this.rightHandPosition.clone().sub(this.prevRightHandPosition);
      let translationDelta = translationDeltaLeft.add(translationDeltaRight).multiplyScalar(0.5);
      this.currentTranslation.add(translationDelta);
    }

    let handDistance = this.leftHandPosition.distanceTo(this.rightHandPosition);
    if (this.isLeftPinching && this.isRightPinching && handDistance > 0.1) {
      let prevDistance = this.prevLeftHandPosition.distanceTo(this.prevRightHandPosition);
      let currentDistance = this.leftHandPosition.distanceTo(this.rightHandPosition);
      let scaleDelta = currentDistance / prevDistance;
      this.currentScale *= scaleDelta;
      this.currentScale = Math.max(0.1, Math.min(this.currentScale, 2));

      // Scaling the mesh down moves the grasp point toward the mesh center
      // To compensate, translate the mesh toward the grasp point (if scaleDelta < 1) or away from the grasp point (if scaleDelta > 1)
      let grasp_point = this.leftHandPosition.clone().add(this.rightHandPosition).multiplyScalar(0.5);
      grasp_point.sub(world_group_position);
      grasp_point.sub(mesh_position);
      this.currentTranslation.add(grasp_point.clone().multiplyScalar(1.0 - scaleDelta));
      this.currentTranslation.x = Math.max(-10.0, Math.min(this.currentTranslation.x, 10.0));
      this.currentTranslation.y = Math.max(-10.0, Math.min(this.currentTranslation.y, 10.0));
      this.currentTranslation.z = Math.max(-5.0, Math.min(this.currentTranslation.z, 5.0));

      // Rotate only about the Y axis
      let rotationDelta = this.normalizeAngle(this.getHandAngle(this.leftHandPosition, this.rightHandPosition) - this.getHandAngle(this.prevLeftHandPosition, this.prevRightHandPosition));
      this.currentRotY += rotationDelta;

      let rotation_motion = new Vector3(-grasp_point.z, 0, grasp_point.x);
      rotation_motion.multiplyScalar(Math.max(Math.min(rotationDelta, 0.1), -0.1));
      this.currentTranslation.add(rotation_motion);
    }
    this.prevLeftHandPosition.copy(this.leftHandPosition);
    this.prevRightHandPosition.copy(this.rightHandPosition);
  }
}

export {GestureControlModule};

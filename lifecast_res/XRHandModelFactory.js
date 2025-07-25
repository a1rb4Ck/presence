/*
MIT License
© 2024 Lifecast Incorporated
https://github.com/fbriggs/lifecast_public/blob/main/web/lifecast_res/XRHandModelFactory.js
*/

import {
  Object3D
} from './three178.module.min.js';  // original three152.module.min.js

import {
  XRHandPrimitiveModel
} from './XRHandPrimitiveModel.js';

import {
  XRHandMeshModel
} from './XRHandMeshModel.js';

class XRHandModel extends Object3D {

  constructor( controller ) {

    super();

    this.controller = controller;
    this.motionController = null;
    this.envMap = null;

    this.mesh = null;

  }

  updateMatrixWorld( force ) {

    super.updateMatrixWorld( force );

    if ( this.motionController ) {

      this.motionController.updateMesh();

    }

  }

}

class XRHandModelFactory {

  constructor() {

    this.path = null;

  }

  setPath( path ) {

    this.path = path;

    return this;

  }

  createHandModel( controller, profile, onLoad) {  /* NOTE: this line is modified from default THREE.js to pass onLoad */

    const handModel = new XRHandModel( controller );

    controller.addEventListener( 'connected', ( event ) => {

      const xrInputSource = event.data;

      if ( xrInputSource.hand && ! handModel.motionController ) {

        handModel.xrInputSource = xrInputSource;

        // @todo Detect profile if not provided
        if ( profile === undefined || profile === 'spheres' ) {

          handModel.motionController = new XRHandPrimitiveModel( handModel, controller, this.path, xrInputSource.handedness, { primitive: 'sphere' } );

        } else if ( profile === 'boxes' ) {

          handModel.motionController = new XRHandPrimitiveModel( handModel, controller, this.path, xrInputSource.handedness, { primitive: 'box' } );

        } else if ( profile === 'mesh' ) {

        /* NOTE: this line is modified from default THREE.js to pass onLoad */
          handModel.motionController = new XRHandMeshModel( handModel, controller, this.path, xrInputSource.handedness, null, onLoad);

        }

      }

      controller.visible = true;

    } );

    controller.addEventListener( 'disconnected', () => {

      controller.visible = false;
      // handModel.motionController = null;
      // handModel.remove( scene );
      // scene = null;

    } );

    return handModel;

  }

}

export { XRHandModelFactory };

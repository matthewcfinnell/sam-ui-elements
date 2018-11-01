
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SamComponentsModule } from './components/components.module';
import { SamDirectivesModule } from './directives';
import { SamElementsModule } from './elements/elements.module';
import { SamFormControlsModule } from './form-controls';
import { SamFormTemplatesModule } from './form-templates';
import { SamLayoutModule } from './layout-deprecated';
import { SamExperimentalModule } from './experimental';
import { SamPipesModule } from './pipes/pipes.module';
import { SamFormService } from './form-service';
import { SamLayoutNextModule } from './layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SamComponentsModule,
    SamDirectivesModule,
    SamElementsModule,
    SamFormControlsModule,
    SamFormTemplatesModule,
    SamLayoutModule,
    SamExperimentalModule,
    SamPipesModule,
    SamLayoutNextModule
  ],
  exports: [
    SamComponentsModule,
    SamDirectivesModule,
    SamElementsModule,
    SamFormControlsModule,
    SamFormTemplatesModule,
    SamLayoutModule,
    SamExperimentalModule,
    SamPipesModule,
    SamLayoutNextModule
  ],
  providers: [SamFormService]
})
export class SamUIKitModule { }


// export { SamComponentsModule } 
// export { SamDirectivesModule }
// export { SamElementsModule }
// export { SamFormControlsModule }
// export { SamFormTemplatesModule }
// export { SamLayoutModule }
// export { SamExperimentalModule }
// export { SamPipesModule }
// export { SamLayoutNextModule }

export { SamComponentsModule } from './components/components.module';
export { SamDirectivesModule } from './directives';
export { SamElementsModule } from './elements/elements.module';
export { SamFormControlsModule } from './form-controls';
export { SamFormTemplatesModule } from './form-templates';
export { SamLayoutModule } from './layout-deprecated';
export { SamExperimentalModule } from './experimental';
export { SamPipesModule } from './pipes/pipes.module';
export { SamFormService } from './form-service';
export { SamLayoutNextModule } from './layout';


// export * from './utilities';
// export * from './wrappers';
// export * from './filters';

// export * from './types';
// export * from './form-service';
// export * from './type-check-helpers';

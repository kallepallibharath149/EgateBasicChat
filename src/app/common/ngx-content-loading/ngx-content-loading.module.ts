import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxContentLoadingComponent } from './ngx-content-loading.component';
import { RectComponent } from './rect/rect.component';
import { SvgElementComponent } from './svg-element/svg-element.component';
import { SvgStopComponent } from './svg-stop/svg-stop.component';
import { FacebookPresetComponent } from './facebook-preset/facebook-preset.component';
import { InstagramPresetComponent } from './instagram-preset/instagram-preset.component';
import { CircleComponent } from './circle/circle.component';
import { CodePresetComponent } from './code-preset/code-preset.component';
import { BulletListPresetComponent } from './bullet-list-preset/bullet-list-preset.component';
import { ListPresetComponent } from './list-preset/list-preset.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxContentLoadingComponent,
    RectComponent,
    CircleComponent,
    SvgElementComponent,
    SvgStopComponent,
    FacebookPresetComponent,
    InstagramPresetComponent,
    CodePresetComponent,
    BulletListPresetComponent,
    ListPresetComponent
  ],
  exports: [
    NgxContentLoadingComponent,
    RectComponent,
    CircleComponent,
    FacebookPresetComponent,
    InstagramPresetComponent,
    CodePresetComponent,
    BulletListPresetComponent,
    ListPresetComponent
  ]
})
export class NgxContentLoadingModule { }

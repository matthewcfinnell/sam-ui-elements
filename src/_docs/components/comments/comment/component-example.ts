
import {
  Component,
  OnInit,
  Input,
  ComponentRef,
  ViewChild,
  ViewRef,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { BaseExampleComponent } from '../../../baseexample.component';

//tabs/spacing matters for code example block
var code_example = 'TODO';

@Component({
  selector: 'doc-sam-comment',
  template: '<doc-template [markdown]="markdown" [example]="example" [typedoc]="typedoc_content"> + code_example + </doc-template>'
})
export class SamCommentComponentExampleComponent extends BaseExampleComponent implements OnInit {
  typedoc_target = "SamCommentComponent";
  typedoc_content = "";
  markdown = require("html-loader!markdown-loader!./documentation.md");
  example = code_example;
}
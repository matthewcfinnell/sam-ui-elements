
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
import { BaseExampleComponent } from '../../baseexample.component';

//tabs/spacing matters for code example block
var code_example = `
<sam-breadcrumbs [crumbs]="crumbs"></sam-breadcrumbs>
`;
@Component({
  selector: 'doc-sam-breadcrumbs',
  template: `<doc-template [markdown]="markdown" [example]="example" [typedoc]="typedoc_content">${code_example}</doc-template>`
})
export class SamBreadcrumbsComponentExampleComponent extends BaseExampleComponent implements OnInit {
  typedoc_target = "SamBreadcrumbsComponent";
  typedoc_content = "";
  markdown = require("html-loader!markdown-it-loader!./documentation.md");
  example = code_example;

  crumbs = [
    { breadcrumb: 'Back to my workspace', url: '/workspace' },
    { breadcrumb: '...'}
  ];
}
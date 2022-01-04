import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastUiImageEditorComponent } from 'ngx-tui-image-editor';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit, AfterViewInit {

  @ViewChild(ToastUiImageEditorComponent)
  editorComponent: ToastUiImageEditorComponent = 
  new ToastUiImageEditorComponent();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ImageEditorComponent>) { 
    this.urlimg = data.urlImage;
  }

  urlimg: string = "";

  ngOnInit(): void {
    
  }

  async ngAfterViewInit() {
    await this.editorComponent.editorInstance.loadImageFromURL(this.urlimg, 'teste').then(
      result => {
        this.editorComponent.editorInstance.ui.resizeEditor({
          imageSize: {oldWidth: result.oldWidth, oldHeight: result.oldHeight, newWidth: result.newWidth, newHeight: result.newHeight}
        });
        // @ts-ignore
         this.editorComponent.editorInstance.ui.activeMenuEvent();
         // @ts-ignore
         this.editorComponent.editorInstance.ui._activateZoomMenus();
      }
    ).catch(err=>{
      console.error("Error:", err);
    });
  }

  saveImage(): void {
    // @ts-ignore
    this.editorComponent.editorInstance.resetZoom();
    this.dialogRef.close(this.editorComponent.editorInstance.toDataURL());
  }
}

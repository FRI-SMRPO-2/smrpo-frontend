import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: "app-import-documentation-modal",
  templateUrl: "./import-documentation-modal.component.html",
  styleUrls: ["./import-documentation-modal.component.scss"],
})
export class ImportDocumentationModalComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  processingRequest: boolean;
  importType: number;
  fileName: string;
  fileContent: string;
  fileUploaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private taskModalDialogRef: MatDialogRef<ImportDocumentationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.importType = 0;
  }

  onFileSelected(event){
    let input = event.target;
    let reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result.toString();
      this.fileName = input.files[0].name;
      this.fileUploaded = true;
    }
    reader.readAsText(input.files[0]);
  }

  save() {
    this.taskModalDialogRef.close(
      {
        importType: this.importType,
        fileContent: this.fileContent
      }
    )
  }
}

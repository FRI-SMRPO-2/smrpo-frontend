import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: "app-post-modal",
  templateUrl: "./post-modal.component.html",
  styleUrls: ["./post-modal.component.scss"],
})
export class PostModalComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  processingRequest: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private taskModalDialogRef: MatDialogRef<PostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      text: '',
    });
  }

  save() {
    if (this.processingRequest) return;

    this.processingRequest = true;
    const data = {
      text: this.form.value.text,
    };

    this.postService.addPost(this.data.projectId, data).subscribe(
      (updatedProject) => {
        this.taskModalDialogRef.close(updatedProject);
      },
      (err) => {
        this.processingRequest = false;
        this.errorMessage =
          (err.error && err.error.text) ||
          (err.error.__all__ && err.error.__all__.join(" ")) ||
          err.error ||
          "Prišlo je do napake.";
      }
    );
  }
}

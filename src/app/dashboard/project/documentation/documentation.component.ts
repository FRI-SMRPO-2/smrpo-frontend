import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Project } from 'src/app/interfaces/project.interface';
import { saveAs } from 'file-saver';

import { RootStore } from '../../../store/root.store';
import { ImportDocumentationModalComponent } from 'src/app/modals/import-documentation-modal/import-documentation-modalcomponent';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentationService } from 'src/app/services/documentation.service';

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.scss"],
})
export class DocumentationComponent implements OnInit, OnDestroy {
  project: Project;
  form: FormGroup;
  message: string;
  error = false;
  processingRequest = false;
  documentationChanged = false;

  destroy$ = new Subject<boolean>();

  constructor(
    private rootStore: RootStore,
    private formBuilder: FormBuilder,
    private documentationService: DocumentationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.rootStore.projectStore.activeProject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((project) => {
        this.project = project;
      });

    this.form = this.formBuilder.group({
      text: this.project.documentation,
    });

    this.onChanged();
  }

  onChanged(): void {
    this.form.valueChanges.subscribe(_ => {
      this.documentationChanged = true;
      this.message = '';
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  importDocumentation(){
    this.dialog.open(ImportDocumentationModalComponent,
      {
        autoFocus: false
      }
    )
    .afterClosed()
    .subscribe((data)=> {
      if (data){
        // append to existing documentation
        if (data.importType == 0){
          this.form.controls['text'].setValue(this.form.value.text + '\n' + data.fileContent);
        }
        else{
          this.form.controls['text'].setValue(data.fileContent);
        }
      }
    })
  }

  exportDocumentation(){
    let blob = new Blob([this.form.value.text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `Dokumentacija_${this.project.name}.txt`);
  }

  saveDocumentation() {
    this.error = false;
    this.message = '';
    this.processingRequest = true;

    const data = {
      documentation: this.form.value.text,
    };

    this.documentationService.updateDocumentation(this.project.id, data).subscribe(
      (updatedProject) => {
        this.message = "Dokumentacija shranjena."
        this.processingRequest = false;
        this.documentationChanged = false;

        if (updatedProject){
          this.project = updatedProject;
          this.rootStore.projectStore.setActiveProject(updatedProject);
        }
      },
      (err) => {
        this.processingRequest = false;
        this.error = true;
        this.message =
          (err.error && err.error.text) ||
          (err.error.__all__ && err.error.__all__.join(" ")) ||
          err.error ||
          "Prišlo je do napake.";
      }
    );
  }

}

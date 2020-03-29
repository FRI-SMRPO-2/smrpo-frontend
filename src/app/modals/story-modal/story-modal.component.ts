import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Project } from 'src/app/interfaces/project.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RootStore } from 'src/app/store/root.store';
import { StoryService } from 'src/app/services/story.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: "app-story-modal",
  templateUrl: "./story-modal.component.html",
  styleUrls: ["./story-modal.component.scss"]
})
export class StoryModalComponent implements OnInit {
  form: FormGroup;
  priorities;
  errorMessage: string;
  tests: FormArray;
  activeProject$: Observable<Project>;
  addingStory: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private storyModalDialogRef: MatDialogRef<StoryModalComponent>,
    private storyService: StoryService,
    private rootStore: RootStore
  ) {}

  ngOnInit() {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;

    this.priorities =
    [
      {id: 4, name: "Won't have this time"},
      {id: 3, name: "Could have"},
      {id: 2, name: "Should have"},
      {id: 1, name: "Must have"},
    ]

    this.addingStory= false;

    this.form = this.formBuilder.group({
      storyName: [''],
      storyDescription: [''],
      businessValue: ['', Validators.min(0)],
      priority: [''],
      tests: this.formBuilder.array([this.createTest()])
    });
  }

  createTest(){
    return this.formBuilder.group({
      testDescription: ''
    })
  }

  addTest() {
    this.tests = this.form.get('tests') as FormArray;
    this.tests.push(this.createTest())
  }

  removeTest(i){
    this.tests.removeAt(i);
  }

  onChange(i){
   if (!this.form.get('tests').value[i+1]) {
      this.addTest()
    }
  }

  checkInput(i){
    return this.form.get('tests').value[i].testDescription != ""
  }

  get testControls() {
    return this.form.get('tests')['controls'];
  }

  save() {
    // TODO: da ne pošiljamo zadnjega empty testa naprej

    this.addingStory = true;

    let data = {name: "", text: "", priority: "", business_value: "", tests: []}
    data.name = this.form.value.storyName;
    data.text = this.form.value.storyDescription
    data.priority = this.form.value.priority
    data.business_value = this.form.value.businessValue
    data.tests = this.form.value.tests.map(test=>test.testDescription)
    data.tests.pop();
    console.log(data)

    this.activeProject$.subscribe((activeProject) =>
      this.storyService.addStory(activeProject.id, data).subscribe(
        () => {
          this.storyService.getAllStories(activeProject.id).subscribe((stories) => {
            this.rootStore.storyStore.setAllStories(stories)
            this.storyModalDialogRef.close(stories);
          })
        },
        (err) => {
          console.log(err)
          this.addingStory = false;
          this.errorMessage = err.error.__all__[0]
        }
      )
    )
  }
}

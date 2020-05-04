import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { StoryService } from 'src/app/services/story.service';
import { RootStore } from 'src/app/store/root.store';

@Component({
  selector: "app-story-modal",
  templateUrl: "./story-modal.component.html",
  styleUrls: ["./story-modal.component.scss"],
})
export class StoryModalComponent implements OnInit {
  form: FormGroup;
  type: "add" | "edit";
  priorities;
  errorMessage: string;
  tests: FormArray;
  activeProject$: Observable<Project>;

  addingStory: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private storyModalDialogRef: MatDialogRef<StoryModalComponent>,
    private storyService: StoryService,
    private rootStore: RootStore,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;

    this.priorities = [
      { id: 4, name: "Won't have this time" },
      { id: 3, name: "Could have" },
      { id: 2, name: "Should have" },
      { id: 1, name: "Must have" },
    ];

    console.log(this.data);

    this.form = this.formBuilder.group({
      name: this.data.name,
      text: this.data.text,
      business_value: [
        this.data.business_value,
        [Validators.min(1), Validators.max(10)],
      ],
      priority: this.data.priorityId,
      tests: this.formBuilder.array(
        this.data.tests.length === 0
          ? [this.createTest()]
          : this.createTests(this.data.tests)
      ),
      complexity: [
        { value: this.data.complexity ?? "", disabled: this.type === "add" },
        [Validators.min(0), Validators.max(200)],
      ],
    });
  }

  createTest(testDescription = "") {
    console.log(this.data.type === "edit" && !this.data.unassigned);
    return this.formBuilder.group({
      testDescription: [
        {
          value: testDescription,
          disabled: this.data.type === "edit" && !this.data.unassigned,
        },
      ],
    });
  }

  createTests(testArray) {
    let tests = [];
    for (let testDescription of testArray) {
      tests.push(this.createTest(testDescription.text));
    }
    if (this.data.unassigned) tests.push(this.createTest());

    return tests;
  }

  addTest() {
    this.tests = this.form.get("tests") as FormArray;
    this.tests.push(this.createTest());
  }

  removeTest(i) {
    this.tests.removeAt(i);
  }

  onChange(i) {
    if (!this.form.get("tests").value[i + 1]) {
      this.addTest();
    }
  }

  checkInput(i) {
    return this.data.unassigned
      ? this.form.get("tests").value[i].testDescription != ""
      : false;
  }

  get testControls() {
    return this.form.get("tests")["controls"];
  }

  // TODO: ko bomo delali urejanje zgodb moramo to funkcijo popravit
  editStory() {
    this.addingStory = true;

    /* data.name = this.form.value.storyName ;
    data.text = this.form.value.storyDescription ;
    data.priority = this.form.value.priority ;
    data.business_value = this.form.value.businessValue ;
    data.tests = this.form.value.tests.map(test=>test.testDescription)
    data.tests.pop();
   */
    const data = {
      ...this.form.value,
      tests: this.form.value.tests.map((test) => test.testDescription),
    };
    data.tests.pop();
    console.log(data);

    this.storyService
      .updateStory(this.data.projectId, this.data.storyId, data)
      .subscribe(
        () => {
          this.storyService
            .getAllStories(this.data.projectId)
            .subscribe((stories) => {
              this.storyModalDialogRef.close(stories);
            });
        },
        (err) => {
          this.addingStory = false;
          this.errorMessage =
            err.error.__all__ === undefined
              ? "Something went wrong, try again later"
              : err.error.__all__[0];
        }
      );
  }

  addStory() {
    this.addingStory = true;

    let data = {
      name: "",
      text: "",
      priority: "",
      business_value: "",
      tests: [],
    };
    data.name = this.form.value.name;
    data.text = this.form.value.text;
    data.priority = this.form.value.priority;
    data.business_value = this.form.value.business_value;
    data.tests = this.form.value.tests.map((test) => test.testDescription);
    data.tests.pop();

    this.storyService.addStory(this.data.projectId, data).subscribe(
      () => {
        this.storyService
          .getAllStories(this.data.projectId)
          .subscribe((stories) => {
            this.storyModalDialogRef.close(stories);
          });
      },
      (err) => {
        console.log(err);
        this.addingStory = false;
        this.errorMessage =
          err.error.__all__ === undefined
            ? "Something went wrong, try again later"
            : err.error.__all__[0];
      }
    );
  }

  get complexity() {
    return this.form.get("complexity");
  }
  get business_value() {
    return this.form.get("business_value");
  }
  get testDescription() {
    return this.form.get("testDescription");
  }
}

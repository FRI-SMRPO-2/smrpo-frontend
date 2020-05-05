import { Component, OnInit, Input,  } from '@angular/core';
import { Inject } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, forkJoin, of} from 'rxjs';
import { RootStore } from 'src/app/store/root.store';
import { StoryService } from 'src/app/services/story.service';
import { Story } from 'src/app/interfaces/story.interface';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: "app-resolve-stories-modal",
  templateUrl: "./resolve-stories-modal.component.html",
  styleUrls: ["./resolve-stories-modal.component.scss"]
})
export class ResolveStoriesModalComponent implements OnInit {
  errorMessage: string;
  activeProject$: Observable<Project>;
  resolvingStories: boolean;
  stories: Story[];
  disableAnimation = true;

  acceptedStories = [];
  rejectedStories = [];

  constructor(
    private storyService: StoryService,
    private sprintService: SprintService,
    private resolveStoriesModalDialogRef: MatDialogRef<ResolveStoriesModalComponent>,
    private rootStore: RootStore,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  acceptStory(id: number){
    const index1 = this.acceptedStories.indexOf(id);
    if (index1 === -1){
      this.acceptedStories.push(id)
    }
    else{
      this.acceptedStories.splice(index1, 1)
    }

    const index2 = this.rejectedStories.findIndex(x => x.id === id);
    if (index2 >= 0) {
      this.rejectedStories.splice(index2, 1);
    }
  }

  rejectStory(id: number){

    const index1 = this.acceptedStories.indexOf(id);
    if (index1>=0){
      this.acceptedStories.splice(index1, 1);
    }

    const index2 = this.rejectedStories.findIndex(x => x.id === id);
    if (index2>=0) {
      this.rejectedStories.splice(index2,1)
    }
    else{
      this.rejectedStories.push(
        {
          id: id,
          comment: ""
        }
      )
    }
  }

  rejectionComment(data: {id: number, comment: string}){

    let object = this.rejectedStories.find(x => x.id === data.id);
    object.comment = data.comment;

  }

  ngOnInit() {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;
    this.stories = this.data.stories;
    this.resolvingStories= false;
  }

  ngAfterViewInit() : void{
    setTimeout(()=>this.disableAnimation=false);
  }

  resolveStories(){
    this.resolvingStories = true;

    forkJoin([
      this.acceptedStories.length > 0 ? this.storyService.acceptStories(this.data.projectId, {"stories": this.acceptedStories}) : of({}),
      this.rejectedStories.length > 0 ? this.storyService.rejectStories(this.data.projectId, {"stories": this.rejectedStories}) : of({})
    ]).subscribe(
      ()=> {
        forkJoin([
          this.storyService.getAllStories(this.data.projectId),
          this.sprintService.getActiveSprint(this.data.projectId)
        ])
        .subscribe(
          ([stories, activeSprint]) =>{
            this.resolveStoriesModalDialogRef.close({stories, activeSprint})
          }
        )
      },
      (err) =>{
        console.log(err),
        this.resolvingStories = false;
        // TODO: probably not handling correctly
        if (err.status<500){
          this.errorMessage = err.error === undefined ? 'Something went wrong, try again later' : err.error;
        }
        else{
          this.errorMessage = 'Something went wrong, try again later';
        }

      }
    )
  }
}

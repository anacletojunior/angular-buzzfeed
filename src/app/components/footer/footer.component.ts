import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() currentQuestion: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() showCounter: boolean = true;
}

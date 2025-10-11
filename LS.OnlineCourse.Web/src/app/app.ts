import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { NavBar } from './components/core/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LS.OnlineCourse.Web');
}

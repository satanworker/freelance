import {Component} from 'angular2/core';
import {Hero} from "./hero";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
})


export class AppComponent {
    title = 'Tour of Heroes';
    clickText = '';

    clickMe() {
        this.clickText  = 'clicked me';
    }

    //event binding with getting target
    eventBinding(event: any) {
        console.log(event.target);
    }
    //on enter event bingings
    blurVal = '';
    blurFunc(elem) {
        this.blurVal = elem.value;

    }
    heroes = [
        new Hero(1, 'Windstorm'),
        new Hero(1, 'Black'),
        new Hero(1, 'Nigger'),
    ];

    myHero = this.heroes[0];
}

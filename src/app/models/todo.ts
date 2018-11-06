import { Pomodoro } from "./pomodoro.model";

export class Todo {
    text: string;
    done: boolean;
    ordinal: number;
    focus: boolean;
    pomodoros: Pomodoro[];
}
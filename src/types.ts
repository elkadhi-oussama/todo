export interface Todo {
    _id: string;
    text: string;
    completed: boolean;
    userId: string; // Add userId property
}
# FiraProjectManagement

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/boards/12345`. The application will automatically reload whenever you modify any of the source files.

## Architecture

Currently, the files in the project are organized into a few separate directories (that are easily extractable to libraries should the project grow):

- <b>base-components:</b> Contains reusable, dumb components
- <b>components:</b> Container components that have some business logic
- <b>templates:</b> Top level components that compose the layout for the overall page
- <b>interfaces:</b> Used for typing across the project
- <b>services:</b> Services for connecting to the api
- <b>state:</b> The files that drive the NGRX store
- <b>directives:</b> What it says on the tin

The idea here is that bigger entities are always pulling in smaller entities so the imports flow in one direction, to avoid circular dependencies.
If a UI is shared between multiple components, I create a dumb, reusable version in the base-components folder. 
If the project grew any bigger, we would split these folders between 'shared' libraries that are used for multiple features, and independent ones that are not.

From a business logic perspective, most of the logic in this application relies on derived state, and therefore lives in the selectors. This means that components
don't have to worry about logic and can just display what they get directly from the selector. This is also advantagious because selectors can be subscribed to in multiple locations
without rerunning logic since they are memoized. If we need a calculation done, we can do it once for the whole application and not in multiple individual components.

## Store Structure
I've structured the store to group all state for a board together. Inside the board state we have three sections: 

BoardDetails: Configuration data for the board, like board name and what columns to show

Tasks: Entity collection tasks, which comes with built-in default collection logic (like adding, removing, updating, etc)

GlobalError: Error string that, when changed, triggers an error popup for the whole page

In terms of file organization, I've moved the logic related to tasks into their own folder to avoid the state files getting too hefty.
This can be done for the board details as well if it got big enough, but I didn't see the need in this case.

## Scalability Patterns

- Multiple boards:
The easiest way to achieve this is to let the api handle all the logic to separate the boards, and have them be on different pages in the UI. 
If we need to display multiple boards on the same page, and maintain a global state, I see two different ways of doing this.

  1. Create a list of boards that each have a nested list of tasks. Both lists could be managed via NGRX entities. (See [this article](https://timdeschryver.dev/blog/nested-ngrx-entity-state)).
  This lets us keep tasks separate based on board so we are dealing with smaller lists.
  2. Have a list of boards and a "pooled" list of tasks that all boards share, and use factory selectors to get the specific tasks for a board. This is the better option if we want to be able to move tasks between boards easily.

Note: I would also want to look into using signal store for this, as I believe it can operate at the component level, so having multiple boards would be as easy as making more instances of the component.

- Real-time collaboration (WebSocket updates): 
We could implement collaboration by subscribing to a websocket and dispatching actions to our NGRX store with the updated data.


- Undo/redo functionality: To build undo/redo functionality, we could add a meta-reducer to build a changelog of task related actions, and then traverse that list and reverse/reperform those actions as we go.


- Offline support: Similar to undo/redo, we could save a copy of all changes since our last sync, and when we are successfully able to sync again, reset the changelog to baseline. We could use local storage to 
make sure changes made offline are not lost on refresh.

## Tradeoffs
- Most obviously, in a real application I wouldn't be dispatching the 'load tasks' event directly from the board-container component. I would set up a resolve guard that dispatched the action to an effect, that 
would get the board and task details.


- To implement the optimistic updates, I've added my own metadata section to document the value last saved to the server. I did look into using the [entity change tracker](https://ngrx.io/guide/data/entity-change-tracker)
from NGRX but that package is in maintenance mode and not recommended for new projects.


- I would normally include more validation on user inputs, like a dropdown for assignee, and definitely better CSS. 

## AI Usage

This code base is about 90% - 95% human written. I did use AI to assist with generating some CSS, to help with research, and to speed up debugging.





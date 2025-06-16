# Mini Task Board

A minimal task board application built with TypeScript, HTML, and Tailwind CSS. The application implements five design patterns to demonstrate clean architecture and maintainable code.

## Features

- Three columns: "To Do", "In Progress", "Done"
- Add tasks with titles
- Drag and drop tasks between columns
- Undo/Redo functionality
- Light/Dark theme toggle
- Notifications for user actions
- Task sorting (alphabetical and by creation time)

## Design Patterns Used

1. **Command Pattern**
   - Implemented in `commands.ts`
   - Used for task operations (add, move, delete)
   - Enables undo/redo functionality
   - Each command encapsulates an action and its reverse

2. **Memento Pattern**
   - Implemented in `memento.ts`
   - Stores board state snapshots
   - Used by the undo/redo system
   - Preserves task history

3. **Strategy Pattern**
   - Implemented in `strategies.ts`
   - Provides different sorting algorithms
   - Easy to add new sorting strategies
   - Used for task organization

4. **Observer Pattern**
   - Implemented in TaskManager
   - UI updates automatically when data changes
   - Loose coupling between data and presentation
   - Enables reactive updates

5. **Singleton Pattern**
   - Implemented in TaskManager and ThemeManager
   - Ensures single instance of managers
   - Global state management
   - Consistent data access

## Technologies Used

- TypeScript
- HTML5
- Tailwind CSS
- Parcel (bundler) 
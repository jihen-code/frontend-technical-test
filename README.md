# Context :

This project was developed as part of the Leboncoin Front-End technical test.

The provided starter project already included the Next.js setup, Pages Router structure, server implementation, and API documentation.

My work focused on implementing the messaging interface on top of this existing structure.

# Features :

- Display the list of conversations
- Select and view a conversation
- Display messages between users
- Send new messages
- Responsive design for desktop and mobile
- Loading and error states
- Message validation and character limit
- API error handling

# Implementation :

### Conversations

I created a dedicated conversation service and `useConversations` hook to handle conversation-related API operations.

The service is responsible for communicating with the provided API, while the hook handles the data and state needed by the UI.

This keeps API-related logic separated from the presentation layer and makes the code easier to maintain.

### Messages

I followed the same approach for messages by creating message service and `useMessages` and `useAddMessage` hooks to handle message-related API operations and state.

### UI

I implemented the required pages and designed the interface based on the provided sketches, while adding my own visual and UX choices.

The goal was to keep the interface simple and intuitive while providing clear feedback for loading, empty, and error states.

## Safety & Error Handling

The application includes several safeguards:

### Message validation

- Empty messages cannot be sent.
- A maximum character limit is applied to messages.

### API errors

API errors are handled in the messaging hooks and surfaced to the UI so that users receive feedback instead of being left with an unexpected or broken state.

### Loading states

Loading states are handled while conversations and messages are being fetched and while messages are being sent.

## Testing

I added tests for selected utility functions and part of the application logic.

Due to the available time for the exercise, the test coverage is not exhaustive. With additional time, I would extend the tests to cover more hooks, components, API scenarios, and end-to-end user flows.

## Responsive Design

The application is designed to work on both desktop and mobile devices.

The layout adapts depending on the screen size to provide an appropriate conversation browsing and messaging experience.

## API

The application uses the local APIs provided by the starter project.

The API specification can be found in:

`docs/api-swagger.yaml`

API communication is handled through dedicated services rather than directly inside the UI components.

## Project Structure

The implementation follows the structure provided by the starter project.

The main additions are:

- Conversation and message services for API communication
- `useConversations`, `useMessages` and `useAddMessage` hooks for data and state management
- Conversations pages and UI components
- Reusable utility functions for common application logic
- CSS Modules for component styling

## Improvements

The following improvements would be possible with additional time:

- Create new conversations
- Add more comprehensive unit and integration tests
- Add end-to-end tests
- Add pagination for large lists
- Add scroll down to the new message when sending messages
- Further optimize API requests and rendering
- Add a character counter when composing a new message.
- Display a clear validation error message when the message exceeds the character limit.

## Running the Project

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run start-server
```

Run the application:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

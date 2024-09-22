// src/index.ts
import connectToDatabase from './database';
import app from './app'; // Import the app
const PORT = process.env.PORT || 3000;
const startApp = async () => {
  await connectToDatabase();
  // Set the port for the app
app.set('port', PORT);
  // Start the Express server
  app.listen(app.get('port'), () => {
    console.log(`Server is running on http://localhost:${app.get('port')}`);
  });
};

startApp().catch((error) => {
  console.error('Error starting the application:', error);
});

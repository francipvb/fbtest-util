import { useFirebaseApp } from "reactfire";

export function AppOverview() {
  const firebaseApp = useFirebaseApp();
  return (
    <div>
      <h1>Your firebase app</h1>
      <ul>
        <li>name: {firebaseApp.name}</li>
      </ul>
    </div>
  );
}

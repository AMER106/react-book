export default function Settings() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>⚙️ Settings</h1>

      <label>
        Username
        <br />
        <input placeholder="Enter username" />
      </label>

      <br />
      <br />

      <label>
        Email
        <br />
        <input placeholder="Enter email" />
      </label>

      <br />
      <br />

      <button>Save Settings</button>
    </div>
  );
}
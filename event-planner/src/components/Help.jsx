import NavBar from "../routes/Navbar";

export default function Help() {
  return (
    <>
      <NavBar />
      <h1>Help</h1>
      <ul></ul>
      <hr />
      <div style={{ textAlign: "left" }}>
        <h2>Registration</h2>
        <ul>
          <li>
            Your <b>Full Name</b> must consist of two words separated by spaces.
            No numbers or non-alphabet characters.
            <ul>
              <li>
                If your surname is double-barrelled or something like that just
                concatenate the names I guess.
              </li>
              <li>If your name contains a number get better parents.</li>
            </ul>
          </li>
          <li>
            Your <b>Password</b> must be at least 8 characters long and contain
            at least one lowercase, uppercase, number, and special character.
          </li>
        </ul>
        <hr />
        <h2>Add Event</h2>
        <ul>
            <li>
                All fields except for <b>Description</b> are required on this form.
            </li>
            <li>
                If your event isn't showing up on your dashboard, confirm you're not setting the event before the current time.
            </li>
        </ul>
        <hr/>
        <h2>Dashboard</h2>
        <ul>
            <li>
                The <b>Update Event</b> button will bring you to a form similar to the Add Event page.
            </li>
            <li>
                The <b>Delete</b> button will <b>not</b> prompt you to confirm so make sure not to click it accidentally.
            </li>
        </ul>
      </div>
    </>
  );
}

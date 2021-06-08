import React from "react";

export default function FormPicture() {
  return (
    <div style={{ marginTop: 100 }}>
      <form method="POST" action="/uploads" enctype="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function CodePreview({ filename, code }) {

  if (!code) {
    return null;
  }

  const lines = code.split("\n");

  return (
    <div className="code-preview">

      <div className="code-header">

        <h2>Uploaded Source Code</h2>

        <span className="file-name">
          {filename}
        </span>

      </div>

      <div className="code-container">

        {lines.map((line, index) => (

          <div
            key={index}
            className="code-line"
          >

            <span className="line-number">
              {index + 1}
            </span>

            <span className="line-code">
              {line}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CodePreview;
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";

import "../css/theme.css";
import "../css/courseContent.css";


export const htmlTopics = [
    // -----------------------------------------------------
    // 1. Introduction
    // -----------------------------------------------------

    {
      id: 1,
      title: "Introduction to HTML",

      content: (
        <>
          <p>
            HTML stands for <strong>HyperText Markup Language</strong>. It is
            the standard language used to create and structure content on web
            pages.
          </p>

          <h3>What is HTML?</h3>

          <p>
            HTML is used to define the structure of a webpage. It tells the
            browser what type of content should appear on the page.
          </p>

          <p>
            For example, HTML can be used to create headings, paragraphs,
            images, links, tables, forms and lists.
          </p>

          <h3>Basic HTML Example</h3>

          <pre>{`<!DOCTYPE html>
<html>

<head>
    <title>My First Page</title>
</head>

<body>

    <h1>Hello World</h1>

    <p>This is my first webpage.</p>

</body>

</html>`}</pre>

          <h3>Why Learn HTML?</h3>

          <ul>
            <li>HTML creates the structure of websites.</li>
            <li>HTML is easy to learn.</li>
            <li>HTML works with CSS.</li>
            <li>HTML works with JavaScript.</li>
            <li>HTML is an important web development skill.</li>
          </ul>
        </>
      ),
    },

    // -----------------------------------------------------
    // 2. Document Structure
    // -----------------------------------------------------

    {
      id: 2,
      title: "HTML Document Structure",

      content: (
        <>
          <p>
            Every HTML document normally follows a basic structure.
            Understanding this structure is important before creating webpages.
          </p>

          <h3>Basic Structure</h3>

          <pre>{`<!DOCTYPE html>

<html>

<head>
    <title>My Website</title>
</head>

<body>

    <h1>Welcome</h1>

    <p>This is my webpage.</p>

</body>

</html>`}</pre>

          <h3>DOCTYPE</h3>

          <p>
            The <strong>&lt;!DOCTYPE html&gt;</strong> declaration tells the
            browser that the document uses HTML5.
          </p>

          <h3>HTML Element</h3>

          <p>
            The <strong>&lt;html&gt;</strong> element is the root element of an
            HTML document.
          </p>

          <h3>Head</h3>

          <p>
            The <strong>&lt;head&gt;</strong> contains information about the
            webpage, such as the title and metadata.
          </p>

          <h3>Body</h3>

          <p>
            The <strong>&lt;body&gt;</strong> contains the content that is
            displayed on the webpage.
          </p>
        </>
      ),
    },

    // -----------------------------------------------------
    // 3. Elements and Tags
    // -----------------------------------------------------

    {
      id: 3,
      title: "HTML Elements and Tags",

      content: (
        <>
          <p>
            HTML uses tags to create elements. Elements are the building blocks
            of an HTML document.
          </p>

          <h3>Example</h3>

          <pre>{`<h1>Hello World</h1>

<p>This is a paragraph.</p>`}</pre>

          <p>
            In the above example, <strong>&lt;h1&gt;</strong> and
            <strong> &lt;p&gt;</strong> are HTML elements.
          </p>

          <h3>Opening and Closing Tags</h3>

          <pre>{`<p>
    This is a paragraph.
</p>`}</pre>

          <p>
            The first tag is the opening tag and the second tag is the closing
            tag.
          </p>

          <h3>Common HTML Elements</h3>

          <ul>
            <li>&lt;h1&gt; - Heading</li>
            <li>&lt;p&gt; - Paragraph</li>
            <li>&lt;a&gt; - Link</li>
            <li>&lt;img&gt; - Image</li>
            <li>&lt;button&gt; - Button</li>
            <li>&lt;div&gt; - Container</li>
          </ul>
        </>
      ),
    },

    // -----------------------------------------------------
    // 4. Attributes
    // -----------------------------------------------------

    {
      id: 4,
      title: "HTML Attributes",

      content: (
        <>
          <p>
            HTML attributes provide additional information about an HTML
            element.
          </p>

          <h3>Example</h3>

          <pre>{`<a href="https://example.com">
    Visit Website
</a>`}</pre>

          <p>
            Here, <strong>href</strong> is an attribute of the anchor element.
          </p>

          <h3>Common Attributes</h3>

          <ul>
            <li>id</li>
            <li>class</li>
            <li>href</li>
            <li>src</li>
            <li>alt</li>
            <li>style</li>
          </ul>

          <h3>id Attribute</h3>

          <pre>{`<h1 id="title">
    Welcome
</h1>`}</pre>

          <h3>class Attribute</h3>

          <pre>{`<p class="description">
    This is a paragraph.
</p>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 5. Headings and Paragraphs
    // -----------------------------------------------------

    {
      id: 5,
      title: "Headings and Paragraphs",

      content: (
        <>
          <p>
            HTML provides six levels of headings from
            <strong> h1 </strong> to <strong>h6</strong>.
          </p>

          <h3>Headings</h3>

          <pre>{`<h1>Main Heading</h1>

<h2>Sub Heading</h2>

<h3>Section Heading</h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}</pre>

          <h3>Paragraph</h3>

          <p>
            The <strong>&lt;p&gt;</strong> element is used to create paragraphs.
          </p>

          <pre>{`<p>
    This is a paragraph.
</p>`}</pre>

          <h3>Line Break</h3>

          <p>
            The <strong>&lt;br&gt;</strong> element creates a line break.
          </p>

          <pre>{`<p>
    Hello<br>
    World
</p>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 6. Links
    // -----------------------------------------------------

    {
      id: 6,
      title: "HTML Links",

      content: (
        <>
          <p>
            Links allow users to navigate from one webpage to another webpage or
            resource.
          </p>

          <h3>Basic Link</h3>

          <pre>{`<a href="https://www.google.com">
    Visit Google
</a>`}</pre>

          <h3>Open Link in New Tab</h3>

          <pre>{`<a
    href="https://www.google.com"
    target="_blank"
>
    Open Google
</a>`}</pre>

          <h3>Link to Another Page</h3>

          <pre>{`<a href="about.html">
    About Us
</a>`}</pre>

          <h3>Email Link</h3>

          <pre>{`<a href="mailto:example@gmail.com">
    Send Email
</a>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 7. Images
    // -----------------------------------------------------

    {
      id: 7,
      title: "HTML Images",

      content: (
        <>
          <p>
            The <strong>&lt;img&gt;</strong> element is used to display images
            on a webpage.
          </p>

          <h3>Basic Image</h3>

          <pre>{`<img
    src="image.jpg"
    alt="Beautiful Landscape"
>`}</pre>

          <h3>src Attribute</h3>

          <p>
            The <strong>src</strong> attribute specifies the path of the image.
          </p>

          <h3>alt Attribute</h3>

          <p>
            The <strong>alt</strong> attribute provides alternative text for the
            image.
          </p>

          <h3>Image Width and Height</h3>

          <pre>{`<img
    src="image.jpg"
    alt="Nature"
    width="500"
    height="300"
>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 8. Lists
    // -----------------------------------------------------

    {
      id: 8,
      title: "HTML Lists",

      content: (
        <>
          <p>Lists are used to display multiple related items.</p>

          <h3>Unordered List</h3>

          <pre>{`<ul>

    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>

</ul>`}</pre>

          <h3>Ordered List</h3>

          <pre>{`<ol>

    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>

</ol>`}</pre>

          <h3>Description List</h3>

          <pre>{`<dl>

    <dt>HTML</dt>
    <dd>Markup language</dd>

    <dt>CSS</dt>
    <dd>Styling language</dd>

</dl>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 9. Tables
    // -----------------------------------------------------

    {
      id: 9,
      title: "HTML Tables",

      content: (
        <>
          <p>HTML tables are used to display data in rows and columns.</p>

          <h3>Basic Table</h3>

          <pre>{`<table>

    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>

    <tr>
        <td>John</td>
        <td>21</td>
    </tr>

    <tr>
        <td>David</td>
        <td>22</td>
    </tr>

</table>`}</pre>

          <h3>Important Table Elements</h3>

          <ul>
            <li>&lt;table&gt; - Creates a table</li>
            <li>&lt;tr&gt; - Creates a table row</li>
            <li>&lt;th&gt; - Table heading</li>
            <li>&lt;td&gt; - Table data</li>
          </ul>
        </>
      ),
    },

    // -----------------------------------------------------
    // 10. Forms
    // -----------------------------------------------------

    {
      id: 10,
      title: "HTML Forms",

      content: (
        <>
          <p>HTML forms are used to collect information from users.</p>

          <h3>Basic Form</h3>

          <pre>{`<form>

    <label>Name:</label>

    <input type="text">

    <label>Email:</label>

    <input type="email">

    <button type="submit">
        Submit
    </button>

</form>`}</pre>

          <h3>Form Action</h3>

          <pre>{`<form action="/submit">

    <input type="text">

    <button type="submit">
        Submit
    </button>

</form>`}</pre>

          <p>
            The <strong>action</strong> attribute specifies where the form data
            should be sent.
          </p>
        </>
      ),
    },

    // -----------------------------------------------------
    // 11. Input Types
    // -----------------------------------------------------

    {
      id: 11,
      title: "HTML Input Types",

      content: (
        <>
          <p>The input element supports different types of user input.</p>

          <h3>Text</h3>

          <pre>{`<input type="text">`}</pre>

          <h3>Email</h3>

          <pre>{`<input type="email">`}</pre>

          <h3>Password</h3>

          <pre>{`<input type="password">`}</pre>

          <h3>Number</h3>

          <pre>{`<input type="number">`}</pre>

          <h3>Date</h3>

          <pre>{`<input type="date">`}</pre>

          <h3>Checkbox</h3>

          <pre>{`<input type="checkbox">
Accept Terms`}</pre>

          <h3>Radio Button</h3>

          <pre>{`<input
    type="radio"
    name="gender"
>
Male

<input
    type="radio"
    name="gender"
>
Female`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 12. Semantic HTML
    // -----------------------------------------------------

    {
      id: 12,
      title: "Semantic HTML",

      content: (
        <>
          <p>
            Semantic HTML elements clearly describe their meaning and purpose.
          </p>

          <h3>Common Semantic Elements</h3>

          <ul>
            <li>&lt;header&gt;</li>
            <li>&lt;nav&gt;</li>
            <li>&lt;main&gt;</li>
            <li>&lt;section&gt;</li>
            <li>&lt;article&gt;</li>
            <li>&lt;aside&gt;</li>
            <li>&lt;footer&gt;</li>
          </ul>

          <h3>Example</h3>

          <pre>{`<header>

    <h1>My Website</h1>

</header>

<nav>

    <a href="#">Home</a>
    <a href="#">About</a>

</nav>

<main>

    <section>

        <h2>Welcome</h2>

        <p>
            Welcome to my website.
        </p>

    </section>

</main>

<footer>

    <p>
        Copyright 2026
    </p>

</footer>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 13. Multimedia
    // -----------------------------------------------------

    {
      id: 13,
      title: "HTML Multimedia",

      content: (
        <>
          <p>HTML provides elements for displaying audio and video content.</p>

          <h3>Audio</h3>

          <pre>{`<audio controls>

    <source
        src="music.mp3"
        type="audio/mpeg"
    >

</audio>`}</pre>

          <h3>Video</h3>

          <pre>{`<video
    width="600"
    controls
>

    <source
        src="video.mp4"
        type="video/mp4"
    >

</video>`}</pre>

          <h3>Iframe</h3>

          <p>
            An iframe can be used to embed another webpage or external content.
          </p>

          <pre>{`<iframe
    src="https://example.com"
    width="600"
    height="400"
></iframe>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 14. Div and Span
    // -----------------------------------------------------

    {
      id: 14,
      title: "Div and Span",

      content: (
        <>
          <p>
            The <strong>&lt;div&gt;</strong> and
            <strong> &lt;span&gt;</strong> elements are commonly used as
            containers.
          </p>

          <h3>Div</h3>

          <p>The div element is a block-level container.</p>

          <pre>{`<div>

    <h2>Student Details</h2>

    <p>
        Name: John
    </p>

</div>`}</pre>

          <h3>Span</h3>

          <p>The span element is an inline container.</p>

          <pre>{`<p>

    My name is
    <span>John</span>.

</p>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 15. HTML Comments
    // -----------------------------------------------------

    {
      id: 15,
      title: "HTML Comments",

      content: (
        <>
          <p>
            Comments are notes written inside HTML code that are not displayed
            on the webpage.
          </p>

          <h3>Example</h3>

          <pre>{`<!-- This is an HTML comment -->

<h1>Hello World</h1>`}</pre>

          <p>
            Comments are useful for explaining code and organizing larger HTML
            documents.
          </p>

          <h3>Multi-line Comment</h3>

          <pre>{`<!--

This is a
multi-line comment.

-->`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 16. HTML Entities
    // -----------------------------------------------------

    {
      id: 16,
      title: "HTML Entities",

      content: (
        <>
          <p>
            HTML entities are used to display reserved characters and special
            symbols.
          </p>

          <h3>Examples</h3>

          <pre>{`&lt;     Less than <
&gt;     Greater than >
&amp;    Ampersand &
&nbsp;    Non-breaking space
&copy;   Copyright ©`}</pre>

          <h3>Example in HTML</h3>

          <pre>{`<p>
    5 &lt; 10
</p>

<p>
    Copyright &copy; 2026
</p>`}</pre>
        </>
      ),
    },

    // -----------------------------------------------------
    // 17. Meta Tags
    // -----------------------------------------------------

    {
      id: 17,
      title: "HTML Meta Tags",

      content: (
        <>
          <p>
            Meta tags provide information about an HTML document. They are
            normally placed inside the head element.
          </p>

          <h3>Character Encoding</h3>

          <pre>{`<meta charset="UTF-8">`}</pre>

          <h3>Viewport</h3>

          <pre>{`<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>`}</pre>

          <p>
            The viewport meta tag helps webpages display correctly on different
            screen sizes.
          </p>
        </>
      ),
    },

    // -----------------------------------------------------
    // 18. HTML5 Features
    // -----------------------------------------------------

    {
      id: 18,
      title: "HTML5 Features",

      content: (
        <>
          <p>
            HTML5 introduced many useful elements and features for modern web
            development.
          </p>

          <h3>Important HTML5 Elements</h3>

          <ul>
            <li>header</li>
            <li>nav</li>
            <li>main</li>
            <li>section</li>
            <li>article</li>
            <li>aside</li>
            <li>footer</li>
            <li>audio</li>
            <li>video</li>
            <li>canvas</li>
          </ul>

          <h3>Canvas Example</h3>

          <pre>{`<canvas
    id="myCanvas"
    width="300"
    height="150"
>
</canvas>`}</pre>

          <p>
            JavaScript can be used with the canvas element to draw graphics.
          </p>
        </>
      ),
    },

    // -----------------------------------------------------
    // 19. Accessibility
    // -----------------------------------------------------

    {
      id: 19,
      title: "HTML Accessibility Basics",

      content: (
        <>
          <p>
            Accessibility means creating webpages that can be used by as many
            people as possible, including people using assistive technologies.
          </p>

          <h3>Alt Text</h3>

          <pre>{`<img
    src="student.jpg"
    alt="Student studying"
>`}</pre>

          <h3>Labels</h3>

          <p>Form inputs should have meaningful labels.</p>

          <pre>{`<label for="email">
    Email
</label>

<input
    type="email"
    id="email"
>`}</pre>

          <h3>Semantic HTML</h3>

          <p>
            Semantic elements such as header, nav, main and footer can help
            communicate the structure of a webpage.
          </p>
        </>
      ),
    },

    // -----------------------------------------------------
    // 20. Complete HTML Example
    // -----------------------------------------------------

    {
      id: 20,
      title: "Complete HTML Page Example",

      content: (
        <>
          <p>
            Now let's combine many of the concepts learned so far into a simple
            HTML webpage.
          </p>

          <h3>Complete Example</h3>

          <pre>{`<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Student Profile</title>

</head>

<body>

    <header>

        <h1>Student Profile</h1>

    </header>

    <nav>

        <a href="#">Home</a>
        <a href="#">Profile</a>
        <a href="#">Contact</a>

    </nav>

    <main>

        <section>

            <h2>About Me</h2>

            <p>
                Hello! I am a computer science student.
            </p>

        </section>

        <section>

            <h2>My Skills</h2>

            <ul>

                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>

            </ul>

        </section>

    </main>

    <footer>

        <p>
            Copyright &copy; 2026
        </p>

    </footer>

</body>

</html>`}</pre>

          <h3>Congratulations!</h3>

          <p>
            You have reached the end of the HTML learning content. The next step
            will be the HTML quiz.
          </p>
        </>
      ),
    },
  ];
function CourseContent() {
  const { course, topic } = useParams();

  const currentTopic = Number(topic);

  // =========================================================
  // HTML COURSE SYLLABUS
  // =========================================================

   

  // =========================================================
  // SELECT COURSE
  // =========================================================

  const topics = course === "html" ? htmlTopics : [];

  // =========================================================
  // FIND CURRENT TOPIC
  // =========================================================

  const topicData = topics.find((item) => item.id === currentTopic);

  // =========================================================
  // TOPIC NOT FOUND
  // =========================================================

  if (!topicData) {
    return (
      <Layout>
        <div className="course-content-page">
          <div className="course-not-found">
            <h2>Topic Not Found</h2>

            <p>Course: {course}</p>

            <p>Topic: {topic}</p>

            <Link to="/course" className="course-back-button">
              ← Back to Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // =========================================================
  // PROGRESS
  // =========================================================

  const progress = (currentTopic / topics.length) * 100;

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <Layout>
      <div className="course-content-page">
        {/* ================= HEADER ================= */}

        <div className="course-content-header">
          <div>
            <h2>{course.toUpperCase()} Notes</h2>

            <p>Learn each topic carefully before moving to the next one.</p>
          </div>

          <div className="course-topic-count">
            Topic {currentTopic} / {topics.length}
          </div>
        </div>

        {/* ================= PROGRESS ================= */}

        <div className="course-progress-wrapper">
          <div className="course-progress-info">
            <span>Course Progress</span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="course-topic-progress">
            <div
              className="course-topic-progress-bar"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

        {/* ================= CONTENT CARD ================= */}

        <div className="course-content-card">
          {/* Topic Title */}

          <h1 className="course-topic-title">{topicData.title}</h1>

          {/* Topic Content */}

          <div className="course-topic-content">{topicData.content}</div>

          {/* ================= NAVIGATION ================= */}

          <div className="course-topic-navigation">
            {/* Previous */}

            {currentTopic > 1 ? (
              <Link
                to={`/course/${course}/${currentTopic - 1}`}
                className="course-topic-prev"
              >
                <span>←</span>
                Previous
              </Link>
            ) : (
              <div></div>
            )}

            {/* Next */}

            {currentTopic < topics.length ? (
              <Link
                to={`/course/${course}/${currentTopic + 1}`}
                className="course-topic-next"
              >
                Next
                <span>→</span>
              </Link>
            ) : (
              <Link to={`/mcq/${course}`} className="course-topic-finish">
                Start Quiz
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CourseContent;

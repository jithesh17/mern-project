import { useState } from "react";
import { htmlTopics } from "../pages/CourseContent";
import "../css/courseNotesViewer.css";

function CourseNotesViewer({ onClose }) {

    const [currentTopic, setCurrentTopic] = useState(1);
    const [zoom, setZoom] = useState(100);

    const topicData = htmlTopics[currentTopic - 1];

    const handlePrevious = () => {
        if (currentTopic > 1) {
            setCurrentTopic(currentTopic - 1);
        }
    };

    const handleNext = () => {
        if (currentTopic < htmlTopics.length) {
            setCurrentTopic(currentTopic + 1);
        }
    };

    const handleZoomIn = () => {
        setZoom((previousZoom) =>
            Math.min(previousZoom + 10, 150)
        );
    };

    const handleZoomOut = () => {
        setZoom((previousZoom) =>
            Math.max(previousZoom - 10, 70)
        );
    };

    return (
        <div className="course-notes-overlay">

            <div className="course-notes-viewer">

                {/* TOOLBAR */}

                <div className="course-notes-toolbar">

                    <div className="course-notes-toolbar-title">
                        HTML Notes
                    </div>

                    <div className="course-notes-page-info">
                        {currentTopic} / {htmlTopics.length}
                    </div>

                    <div className="course-notes-controls">

                        <button
                            type="button"
                            onClick={handleZoomOut}
                        >
                            −
                        </button>

                        <span>
                            {zoom}%
                        </span>

                        <button
                            type="button"
                            onClick={handleZoomIn}
                        >
                            +
                        </button>

                        <button
                            type="button"
                            className="course-notes-close"
                            onClick={onClose}
                        >
                            ×
                        </button>

                    </div>

                </div>


                {/* DOCUMENT AREA */}

                <div className="course-notes-body">

                    <div
                        className="course-notes-page"
                        style={{
                            transform: `scale(${zoom / 100})`
                        }}
                    >

                        <div className="course-notes-page-content">

                            <h1 className="course-notes-topic-title">
                                {topicData.title}
                            </h1>

                            <div className="course-notes-content">
                                {topicData.content}
                            </div>

                        </div>

                    </div>

                </div>


                {/* NAVIGATION */}

                <div className="course-notes-navigation">

                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentTopic === 1}
                    >
                        ← Previous
                    </button>

                    <span>
                        Topic {currentTopic} of {htmlTopics.length}
                    </span>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentTopic === htmlTopics.length}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CourseNotesViewer;

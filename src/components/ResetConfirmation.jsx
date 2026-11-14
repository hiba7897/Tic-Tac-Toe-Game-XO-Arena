
import { useEffect, useRef } from "react";

function ResetConfirmation({
    onConfirm,
    onCancel
}) {
    const dialogRef = useRef(null);
    const cancelButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        // Remember which element opened the dialog.
        previousFocusRef.current = document.activeElement;

        // Move keyboard focus to Cancel.
        cancelButtonRef.current?.focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel();
                return;
            }

            if (event.key === "Tab") {
                const focusableElements = dialog.querySelectorAll(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === lastElement
                ) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);

            // Return focus to the element that opened the dialog.
            previousFocusRef.current?.focus();
        };
    }, [onCancel]);

    return (
        <div className="confirmation-overlay">
            <div
                ref={dialogRef}
                className="confirmation-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="reset-dialog-title"
                aria-describedby="reset-dialog-description"
            >
                <h2 id="reset-dialog-title">
                    Reset Scores?
                </h2>

                <p id="reset-dialog-description">
                    Are you sure you want to reset all scores?
                    This action cannot be undone.
                </p>

                <div className="confirmation-buttons">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="confirm-reset-button"
                        onClick={onConfirm}
                    >
                        Yes, Reset Scores
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResetConfirmation;

const testParagraph = document.querySelector('#test');

export function changeTestText(text: string) {
    if (testParagraph === null) {
        return;
    }

    testParagraph.textContent = text;
}
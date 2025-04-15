import "@components/common/css/mailWritingContainer.css";
import generateImg from "@assets/icons/ai.svg";

function WriteContainer({
  className,
  value,
  onChange,
  isAiOn,
  gptSuggestion,
  onKeyDown,
  htmlContent,
}) {
  return (
    <div className={`write-container-wrapper ${className}`}>
      <div className={`write-container-shadow ${className}`}></div>
      <div className={`write-container ${className}`}>
        {/* 사용자 입력 영역 */}
        <textarea
          className={`writeField ${className}`}
          placeholder="내용을 입력하세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />

        {/* AI 제안 영역 gptSuggestion &&*/}
        {isAiOn && gptSuggestion && (
          <div className="gptSuggestionBox">
            {gptSuggestion ? (
              <p className="gptSuggestionText">
                {gptSuggestion}
              </p>
            ) : (
              <div className="generateLoadingContainer">
                <img src={generateImg} className="generateImg"/>
                <p className="loadingText">
                  생성 중 ...
                </p>
              </div>
            )}
          </div>
        )}

        {/* 원문 HTML 렌더링 영역 */}
        {htmlContent.length > 0 && (
          <>
            <div
              className="writeField original-html"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default WriteContainer;

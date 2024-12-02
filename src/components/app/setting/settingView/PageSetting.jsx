import { useEffect, useState } from "react";

export default function PageSetting() {
  const [selectedPage, setSelectedPage] = useState("page1");
  const [theme, setTheme] = useState("light");

  // 페이지가 처음 렌더링 될 때 로컬 스토리지에서 테마 값을 가져오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 테마가 변경될 때마다 로컬 스토리지에 저장하고, body에 클래스명을 적용
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  // 테마 전환 함수
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="pageSetting">
      {/* 배경 설정 */}
      <div className="backgroundSettings">
        <h5>배경 설정</h5>
        <div className="PageBackground">
          <span>배경 색상:</span>
          <input type="color" name="backgroundColor" />
          <button>적용</button>
        </div>
      </div>

      {/* 테마 설정 */}
      <div className="temaSettings">
        <h5>테마 설정</h5>
        <button onClick={toggleTheme} className="temaBtn">
          {theme === "light" ? "블랙 모드로 변경" : "화이트 모드로 변경"}
        </button>
      </div>
    </div>
  );
}

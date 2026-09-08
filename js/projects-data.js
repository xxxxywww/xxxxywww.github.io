/* ==========================================================================
   PORTFOLIO PROJECTS DATA
   이예원 (LEEyewon) - Computer Science & Design Hybrid Portfolio
   ========================================================================== */

const PORTFOLIO_PROJECTS = [
  {
    id: "neodesign-system",
    title: "NeoDesign: 토큰 기반 통합 디자인 시스템",
    category: "system",
    categoryLabel: "Design System & Dev",
    summary: "Figma Variables와 웹 프론트엔드 CSS 토큰을 1:1 동기화하여 디자이너와 엔지니어 간의 핸드오프 마찰을 90% 줄인 확장형 시스템.",
    bgGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    iconName: "layers",
    techStack: ["Figma Tokens", "React", "CSS Variables", "Storybook", "Design QA"],
    details: {
      role: "Lead UI/UX Designer & Frontend Token Architect",
      period: "2024.03 - 2024.08",
      challenge: "디자인 시안과 실제 개발된 컴포넌트 간의 타이포그래피, 간격(Spacing), 색상 불일치로 인해 스프린트마다 불필요한 커뮤니케이션 비용과 리워크가 반복 발생함.",
      designSolution: "8pt 그리드 시스템을 기반으로 한 일관된 스페이싱 토큰, 시각적 계층 구조가 명확한 다크/라이트 시맨틱 컬러 팔레트 구축. Figma 자동 레이아웃(Auto Layout)과 컴포넌트 프로퍼티를 완벽히 모듈화함.",
      techSolution: "컴퓨터공학 전공 지식을 살려 Figma Token JSON 데이터를 GitHub Action을 통해 CSS/SCSS 변수로 자동 변환·배포하는 파이프라인 구성. 개발자가 디자인을 별도 측정 없이 컴포넌트 단위로 즉시 사용 가능하도록 설계.",
      keyOutcome: "신규 기능 화면 제작 속도 약 45% 단축, 디자인-개발 QA 피드백 소요 시간 70% 감소, 일관된 사용자 경험 확립.",
      links: {
        demo: "#",
        github: "https://github.com/xxxxywww",
        figma: "#"
      }
    }
  },
  {
    id: "pulseflow-app",
    title: "PulseFlow: 크리에이터를 위한 포커스 대시보드",
    category: "dev",
    categoryLabel: "Web & Development",
    summary: "사용자 몰입을 극대화하는 미니멀한 UI와 고성능 상태 관리를 결합한 올인원 타임 트래킹 & 생산성 웹 애플리케이션.",
    bgGradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    iconName: "activity",
    techStack: ["UI/UX Design", "JavaScript ES6+", "Web Audio API", "LocalStorage", "Micro-interactions"],
    details: {
      role: "End-to-End Product Designer & Front-End Developer",
      period: "2024.09 - 2024.12",
      challenge: "기존 일정/타이머 도구들의 과도한 알림과 복잡한 대시보드로 인한 인지적 과부하(Cognitive Overload) 문제 해결 필요.",
      designSolution: "불필요한 UI 노이즈를 걷어낸 '다크 포커스 모드', 시선 이동 동선을 고려한 F-패턴 대시보드 구조 및 부드러운 상태 전환 마이크로 인터랙션 설계.",
      techSolution: "순수 자바스크립트 기반의 경량화된 반응형 웹앱 제작. Web Audio API를 활용한 맞춤형 앰비언트 노이즈 재생기 탑재 및 로컬 스토리지를 활용한 오프라인 지속성 보장.",
      keyOutcome: "로딩 타임 0.4초대 달성, 감각적인 인터랙션에 대한 사용자 피드백 만족도 96% 기록.",
      links: {
        demo: "#",
        github: "https://github.com/xxxxywww"
      }
    }
  },
  {
    id: "cleantransit-ux",
    title: "CleanTransit: 교통 약자를 위한 접근성 길찾기 UX",
    category: "design",
    categoryLabel: "UI/UX Research",
    summary: "공공 교통 데이터 구조를 분석하고, 저상버스 탑승자와 휠체어 이용자를 위해 직관적이고 친절하게 재설계한 이동 지원 서비스.",
    bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    iconName: "compass",
    techStack: ["User Research", "Figma", "WCAG 2.1", "Data Analysis", "Prototyping"],
    details: {
      role: "UX Researcher & Interaction Designer",
      period: "2024.01 - 2024.04",
      challenge: "기존 지도 앱들은 엘리베이터 고장 여부나 휠체어 리프트 위치 등 교통 약자에게 치명적인 핵심 정보가 하위 뎁스에 숨겨져 있어 사용이 어려움.",
      designSolution: "WCAG 2.1 AAA 등급의 명도 대비(4.5:1 이상) 보장, 한 손 조작이 용이한 하단 바텀시트 UI, 직관적인 픽토그램과 보이스오버(스크린리더) 라벨링 최적화.",
      techSolution: "서울시 공공 OpenAPI의 버스/지하철 실시간 엘리베이터 가동 데이터 구조를 직접 파악하여, 기술적으로 지연 없이 표출 가능한 최적의 정보 구조(IA) 설계.",
      keyOutcome: "사용성 테스트(UT) 결과 목적지 도달 탐색 시간 평균 38% 단축, 휠체어 이용자 타겟 만족도 대폭 향상.",
      links: {
        figma: "#",
        demo: "#"
      }
    }
  },
  {
    id: "codecraft-academy",
    title: "CodeCraft: 인터랙티브 알고리즘 비주얼라이저",
    category: "dev",
    categoryLabel: "Creative Dev & CS",
    summary: "컴퓨터공학의 추상적인 자료구조와 정렬 알고리즘을 시각적이고 직관적인 애니메이션으로 학습할 수 있는 에듀테크 인터랙티브 웹.",
    bgGradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    iconName: "cpu",
    techStack: ["Canvas API", "Algorithms", "Vanilla JS", "UI Animation", "Responsive CSS"],
    details: {
      role: "Interactive Designer & Core Logic Developer",
      period: "2023.08 - 2023.11",
      challenge: "정렬(Quick/Merge), BFS/DFS 등 핵심 알고리즘의 동작 과정을 텍스트 코드만으로 이해하기 어려워하는 학생들을 위한 시각화 필요.",
      designSolution: "알고리즘의 각 단계를 음악의 리듬감처럼 시각화한 모던 컬러 인덱싱, 단계별 되감기/일시정지 타임라인 컨트롤러 UI 디자인.",
      techSolution: "HTML5 Canvas를 활용한 60fps 부드러운 렌더링 구현. 비동기 Promise 기반으로 애니메이션 프레임과 알고리즘 단계 동기화.",
      keyOutcome: "교내 전공 스터디 교재로 채택 및 피어 리뷰에서 '디자인과 알고리즘이 완벽히 조화된 시각화'라는 높은 평가 획득.",
      links: {
        demo: "#",
        github: "https://github.com/xxxxywww"
      }
    }
  },
  {
    id: "editorial-archive",
    title: "Aesthete: 에디토리얼 아카이빙 플랫폼",
    category: "design",
    categoryLabel: "Editorial & Web",
    summary: "잡지의 여백과 타이포그래피 미학을 웹 상의 스크롤 인터랙션으로 구현한 아티스트 포트폴리오 큐레이션 웹.",
    bgGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    iconName: "layout",
    techStack: ["Typography", "Grid System", "Modern CSS", "Figma", "Branding"],
    details: {
      role: "Brand Identity, UI Designer",
      period: "2023.03 - 2023.06",
      challenge: "디지털 화면에서도 인쇄 매체의 높은 품격과 여백의 미학을 온전히 전달할 수 있는 웹 갤러리 템플릿 설계.",
      designSolution: "비대칭(Asymmetric) 그리드 시스템, 세리프와 산세리프의 우아한 페어링, 섬세한 텍스트 커닝과 라인 하이트 조정.",
      techSolution: "CSS Subgrid와 CSS 변수를 활용한 유연하고 정밀한 반응형 칼럼 레이아웃 구현.",
      keyOutcome: "브랜드 아이덴티티 수립 및 모바일-태블릿 완벽 지원 반응형 웹 완성.",
      links: {
        figma: "#",
        demo: "#"
      }
    }
  },
  {
    id: "micro-canvas",
    title: "CanvasGen: 제너레이티브 비주얼 아트 랩",
    category: "dev",
    categoryLabel: "Creative Coding",
    summary: "수학적 수식과 마우스 좌표에 반응하는 인터랙티브 파티클 캔버스 및 웹 그래픽 생성 도구.",
    bgGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    iconName: "sparkles",
    techStack: ["HTML5 Canvas", "Math & Physics", "Vector Math", "Interactive UI"],
    details: {
      role: "Creative Developer",
      period: "2024.05 - 2024.06",
      challenge: "정적인 그래픽 디자인을 넘어 사용자의 입력에 실시간으로 유기적으로 반응하는 디지털 인터랙션 연구.",
      designSolution: "사이버네틱 네온 컬러 팔레트와 실시간 반응형 유저 피드백 이펙트 설계.",
      techSolution: "속도와 가속도, 반발력을 시뮬레이션한 파티클 물리 엔진을 경량 코드로 자체 제작하여 렌더링 부하 최소화.",
      keyOutcome: "마우스 움직임에 따른 몰입감 있는 시각적 경험 제공, 개인 브랜딩 비주얼 에셋으로 활용.",
      links: {
        demo: "#",
        github: "https://github.com/xxxxywww"
      }
    }
  }
];

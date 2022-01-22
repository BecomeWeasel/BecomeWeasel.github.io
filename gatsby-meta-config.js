module.exports = {
  title: `becomeweasel.me`,
  description: `황성우의 우당탕탕 개발기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://becomeweasel.me/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `BecomeWeasel/BecomeWeasel.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-NE46C2SFP9', // Google Analytics Tracking ID
  author: {
    name: `황성우`,
    bio: {
      role: `개발자`,
      description: ['기본기에 자신있는', '내부구조에 관심 있는', '능동적으로 성장하는'],
      thumbnail: 'zoomkoding.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/BecomeWeasel`,
      linkedIn: `https://www.linkedin.com/in/sungwoo-hwang/`,
      email: `hsw0194@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2019.01 ~',
        activity: '개발 시작',
      },
      {
        date: '2019.09 ~ 2019.12',
        activity: 'SKT AI 커리큘럼 Capstone Project 최우수상',
      },

      {
        date: '2020.06 ~ 2021.8',
        activity: '알고리즘 휴학 & 코드포스 블루 달성',
        links: {
          post: 'https://solved.ac/profile/hsw0194',
        },
      },
      {
        date:'2021.10 ~',
        activity : 'Google Developer Student Clubs',
        links :{
          post: 'https://gdsc.community.dev/hanyang-university/'
        }
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      /*
      {
        title: '만다오(프로모션 웹앱 빌더) 개발',
        description:
          '만다오는 우아한형제들에 입사한 후 처음으로 진행한 프로젝트로, 각종 프로모션 페이지를 마케터와 디자이너가 개발자 없이 만들 수 있게 하기 위한 WYSIWYG 방식의 웹 에디터입니다. 만다오 팀은 모든 사람이 디자인을 해야한다는 신념 하에 모든 팀원들이 직접 기획, 디자인, 개발을 진행하고 있습니다. 만다오는 제가 합류한 후에 고도화된 기능들이 많이 추가되어 가고 있고, 최종적으로는 모든 프로모션 페이지를 만들 수 있도록 계속해서 기능을 확장해나갈 예정입니다.',
        techStack: ['react', 'nestjs'],
        thumbnailUrl: 'mandao.png',
        links: {
          post: 'https://techblog.woowahan.com/2719',
        },
      },
      */
    ],
  },
};

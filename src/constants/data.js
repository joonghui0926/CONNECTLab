// 네비게이션 링크
export const NAV_LINKS = [
  {
    "path": "/",
    "label": "Home"
  },
  {
    "path": "/professor",
    "label": "Professor"
  },
  {
    "path": "/students",
    "label": "Students"
  },
  {
    "path": "/research",
    "label": "Research"
  },
  {
    "path": "/publications",
    "label": "Publications"
  },
  {
    "path": "/teaching",
    "label": "Teaching"
  },
  {
    "path": "/projects",
    "label": "Projects"
  }
];

// 홈 - 공지사항, 뉴스, 주소
export const HOME_DATA = {
  "announcement": {
    "title": "Announcement",
    "subtitle": "(Opening 2026)",
    "content": "KAIST 전기및전자공학부 CONNECT Lab (Communications and Networking for Connectivity)에서는 차세대 통신 이론 및 시스템을 함께 연구할 대학원생(석사/박사/석박통합)을 모집합니다."
  },
  "news": [
    {
      "date": "08/2025",
      "text": "Prof. Choi joins KAIST EE."
    },
    {
      "date": "07/2025",
      "text": "Our paper on the Stochastic Geometry Analysis of Walker Constellation is accepted to IEEE Transactions on Vehicular Technology."
    },
    {
      "date": "06/2025",
      "text": "TPC member for EUCNC workshop: System Analysis of NTN"
    },
    {
      "date": "03/2025",
      "text": "We move to Department of ECE, SKKU (Sungkyunkwan University)"
    },
    {
      "date": "02/2025",
      "text": "Our paper on vehicular relays and network coverage is accepted to IEEE Transactions on Vehicular Technology"
    },
    {
      "date": "11/2024",
      "text": "Our new paper on LEO satellite networks with aerial platform is accepted to IEEE Internet of Things Journal"
    },
    {
      "date": "09/2024",
      "text": "Our new paper on LEO satellite networks is accepted to IEEE Transactions on Communications"
    },
    {
      "date": "08/2024",
      "text": "Our new paper on Reflective intelligent surface is accepted to IEEE Transactions on Communications"
    },
    {
      "date": "05/2024",
      "text": "Our new paper on Multi-altitude LEO satellite modeling is accepted to IEEE Transactions on Vehicular Technology"
    },
    {
      "date": "04/2024",
      "text": "한국연구재단 개인기초 우수신진연구 선정 되었습니다."
    },
    {
      "date": "01/2024",
      "text": "Our new paper on Heterogeneous LEO satellite network is accepted to IEEE Transactions on Wireless Communications"
    },
    {
      "date": "12/2023",
      "text": "Our new paper on Data Harvesting with LEO satellites is accepted to IEEE Journal on Selected Areas in Communications"
    }
  ],
  "location": "N1 715, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea"
};

// 교수님 프로필
export const PROFESSOR_DATA = {
  "name": "Prof. Chang-Sik Choi",
  "koreanName": "최창식",
  "image": "/assets/professor.jpg",
  "bio": [
    "Chang-Sik Choi is an Assistant Professor in the School of Electrical Engineering at KAIST, where he leads the CONNECT Lab. His research focuses on developing tractable and geometry-aware models for next-generation communication systems, including satellite networks and vehicular networks using mathematical tools.",
    "Prior to joining KAIST, he was with SKKU, Hongik University, and Qualcomm Wireless R&D, where he worked on vehicular communications and positioning systems, contributing to multiple patents. He received his Ph.D. in Electrical Engineering from The University of Texas at Austin.",
    "His current research aims to establish a new analytical framework for large-scale wireless networks by explicitly incorporating orbital structures and dynamics, moving beyond conventional spatial models."
  ],
  "researchInterests": [
    "Modeling and Analysis of cellular communications, vehicle-to-all communications, satellite communications",
    "Vehicle positioning for autonomous driving"
  ],
  "education": [
    {
      "degree": "Ph.D.",
      "institution": "The University of Texas at Austin",
      "major": "ECE",
      "year": "2019"
    },
    {
      "degree": "MS",
      "institution": "The University of Texas at Austin",
      "major": "ECE",
      "year": "2014"
    },
    {
      "degree": "BSEE",
      "institution": "Seoul National University",
      "major": "ECE",
      "year": "2012 (summa cum laude)"
    }
  ],
  "experience": [
    {
      "role": "Assistant Professor",
      "institution": "KAIST",
      "period": "2025~"
    },
    {
      "role": "Assistant Professor",
      "institution": "SKKU",
      "period": "2025"
    },
    {
      "role": "Assistant Professor",
      "institution": "Hongik University",
      "period": "2021-2024"
    },
    {
      "role": "Senior system engineer",
      "institution": "Qualcomm",
      "period": "2020-2021"
    }
  ],
  "selectedPublications": [
    "Chang-Sik Choi*, \"Analysis of a Delay-Tolerant Data Harvesting Architecture Leveraging Low Earth Orbit Satellite Networks,\" IEEE Journal on Selected Areas Communications, May 2024 (Telecommunication Journal Ranking 상위 2%)",
    "Chang-Sik Choi*, \"Modeling and Analysis of Downlink Communications in a Heterogeneous LEO Satellite Network,\" IEEE Transactions on Wireless Communications, Aug 2024 (Telecommunication Journal ranking 상위 5%)"
  ]
};

// Students - 모집 공고, 구성원 카드
export const STUDENTS_DATA = {
  "recruitment": {
    "title": "[KAIST 전기및전자공학부 CONNECT Lab 대학원생 모집]",
    "description": "KAIST 전기및전자공학부 CONNECT Lab (Communications and Networking for Connectivity)에서는 차세대 통신 이론 및 시스템을 함께 연구할 대학원생(석사/박사/석박통합)을 모집합니다.",
    "sections": [
      {
        "title": "연구 분야",
        "content": "본 연구실은 확률기하학(stochastic geometry)과 확률(advanced probability and stochastic process), 그리고 동적 시스템(dynamical systems)을 기반으로, 다음과 같은 차세대 통신 시스템을 이론적으로 모델링하고 분석합니다.",
        "list": [
          "위성통신 (LEO/MEO satellite networks)",
          "차량 통신 (V2X, sidelink communications)",
          "6G 네트워크 모델링 및 성능 분석",
          "위성 기반 차량 및 유저 측위기술 최적화 알고리즘 개발"
        ],
        "footer": "특히, 최근에는 궤도 구조를 고려한 새로운 공간 모델링 (orbit-structured modeling)을 통해 균일하게 모델링했던 기존의 PPP 기반 분석의 한계를 극복하고 이를 활용하여 위성을 포함한 버티컬 통신의 분석과 최적화에 대한 연구를 수행하고 있습니다."
      },
      {
        "title": "연구 특징",
        "list": [
          "이론 중심 연구 (수학적 모델링을 통한 네트워크의 성능 분석, tractable analysis)",
          "실제 시스템과 연결된 문제 설정 (위성/차량 통신/셀룰러6G)",
          "국제 공동연구 및 최신 연구 주제 반영"
        ]
      },
      {
        "title": "지원 자격",
        "list": [
          "전기전자공학, 수학, 컴퓨터공학 등 관련 분야 전공자",
          "확률, 통계, 선형대수, 통신이론에 대한 기본적 이해",
          "수학적 모델링 및 분석에 흥미가 있는 학생"
        ]
      },
      {
        "title": "우대 사항",
        "list": [
          "stochastic geometry / random process 경험",
          "Matlab / Python 경험",
          "영어 논문 작성 능력"
        ]
      },
      {
        "title": "연구 환경",
        "list": [
          "KAIST 내 우수한 연구 인프라",
          "국제 학회 및 저널 논문 직접 지도",
          "자율적이고 집중할 수 있는 연구 분위기",
          "경쟁력 있는 연구지원 및 장학금 제공"
        ]
      },
      {
        "title": "지도 교수",
        "content": "최창식 교수 (KAIST 전기및전자공학부)",
        "list": [
          "前 Qualcomm Wireless R&D Senior Systems Engineer",
          "위성통신 및 차량통신 분야 다수의 특허 보유 및 연구 수행"
        ]
      }
    ]
  },
  "members": [
    {
      "name": "최진현",
      "group": "Alumni (홍익대학교)",
      "image": "/assets/최진현.jpg",
      "interests": "RIS and LEO satellite networks",
      "publications": null
    },
    {
      "name": "김해림",
      "group": "Alumni (홍익대학교)",
      "image": "/assets/김해림.jpg",
      "interests": "V2X",
      "publications": "싱글 홉을 기반으로 하는 차량 기반 IoT 네트워크의 전력 분석 - 한국통신학회 추계학술대회 2021"
    },
    {
      "name": "한상우",
      "group": "Alumni (홍익대학교)",
      "image": "/assets/한상우.jpg",
      "interests": "V2X",
      "publications": "공유 모빌리티를 활용한 데이터 수확 연구 (A study on data harvesting leveraging shared mobility) - 한국통신학회 추계학술대회 2021"
    }
  ]
};

// Research - 연구 주제 카드 (이미지는 /assets/)
export const RESEARCH_DATA = [
  {
    "title": "Stochastic Geometry and Dynamical System Analysis of Walker Satellite Constellations",
    "image": "/assets/research1.png",
    "description": "In practice, low Earth orbit (LEO) and medium Earth orbit (MEO) satellite networks consist of multiple orbits which are populated with many satellites. A widely used spatial architecture for LEO or MEO satellites is the Walker constellation, where the longitudes of orbits are equally spaced and the satellites are equally spaced along the orbits. In this paper, we develop a stochastic geometry model for the Walker constellations. This proposed model enables an analysis based on dynamical system theory, which allows one to address essential structural properties such as periodicity and ergodicity. It also enables a stochastic geometry analysis under which we derive the performance of downlink communications of a typical user at a given latitude, as a function of the key constellation parameters."
  },
  {
    "title": "Analysis of a Delay-Tolerant Data Harvest Architecture Leveraging Low Earth Orbit Satellite Networks",
    "image": "/assets/research2.png",
    "description": "Reaching all regions of Earth, low Earth orbit (LEO) satellites can harvest delay-tolerant data from remotely located users on Earth without ground infrastructure. This work aims to assess a data harvest network architecture where users generate data and LEO satellites harvest data from users when passing by. By developing a novel stochastic geometry Cox point process model that simultaneously generates orbits and the motion of LEO satellite harvesters on them, we analyze key performance indices of such a network by deriving the following: (i) the average fraction of time that the typical user is served by LEO satellite harvesters, (ii) the average amount of data uploaded per each satellite pass, (iii) the maximum harvesting capacity of the proposed network model, and (iv) the delay distribution in the proposed network. These key metrics are given as functions of key network variables such as λ the mean number of orbits and μ the mean number of satellites per orbit. Providing rich comprehensive analytical results and practical interpretations of these results, this work assesses the potential of the delay-tolerant use of LEO satellites and also serves as a versatile framework to analyze, design, and optimize delay-tolerant LEO satellite networks."
  },
  {
    "title": "Modeling and Analysis of Downlink Communications in a Heterogeneous LEO Satellite Network",
    "image": "/assets/research3.png",
    "description": "Low Earth Orbit (LEO) satellite networks are rapidly expanding to support a wide range of services—such as data communications, remote sensing, and data harvesting—and will increasingly share spectrum among multiple operators. To investigate the coexistence of such future heterogeneous LEO networks, we propose a tractable spatial model based on Cox point processes, capturing satellite distributions across various orbits. We analyze downlink performance under two access schemes: closed access and open access. Our results show that open access consistently yields better coverage probability for all users. By offering key network performance metrics and demonstrating the suitability of the Cox model in approximating future constellations with minor variability, our framework provides a practical foundation for designing, evaluating, and optimizing heterogeneous LEO satellite networks."
  },
  {
    "title": "An Analytical Framework for Downlink LEO Satellite Communications",
    "image": "/assets/research4.png",
    "description": "This work develops an analytical framework for downlink low earth orbit (LEO) satellite communications, leveraging tools from stochastic geometry. We propose a tractable approach to the analysis of such satellite communication systems accounting for the fact that satellites are located on circular orbits. We accurately characterize this geometric property of such LEO satellite constellations by developing a Cox point process model that jointly produces orbits and satellites on these orbits. Our work differs from existing studies that have assumed satellites' locations as completely random binomial point processes."
  },
  {
    "title": "Spatially-correlated Blockage in Highway Vehicular Networks",
    "image": "/assets/research5.png",
    "description": "The line-of-sight (LOS) signals play a significant role in enabling various applications. For instance, in positioning systems, users or vehicles can estimate their relative distances and positions based on the time-of-arrivals (ToAs) and time- of-departures (ToDs) of LOS signals from anchors. This work presents a stochastic geometric framework modeling and analyzing spatially correlated blockage in a highway vehicular network."
  },
  {
    "title": "Analysis of Vehicle-to-everything (V2X) Communications",
    "image": "/assets/research6.png",
    "description": "This work analyzes an emerging architecture of cellular network utilizing both planar base stations uniformly distributed in the Euclidean plane and base stations (or RSUs) located on roads. An example of this architecture is that where, in addition to conventional planar cellular base stations and users, vehicles also play the role of both base stations and users. A Cox point process is used to model the location of base stations."
  },
  {
    "title": "Data harvesting through vehicle gateways",
    "image": "/assets/research7.png",
    "description": "Disruptive changes are underway in the automotive industry as large-scale platforms based on vehicular fleets are deployed to deliver ride sharing and delivery services. This stuey examines a network architecture based on a mesh of IoT devices, roadside repositories and vehicular mobile gateways -- referred to as mesh+vehicular. We propose a system-level model to study its relative merits versus conventional infrastructure-based IoT architectures-- referred to as mesh+cellular."
  },
  {
    "title": "Performance Analysis of Vehicle Safety Message",
    "image": "/assets/research8.png",
    "description": "This paper concerns the performance of vehicle-to-everything (V2X) communications. More precisely, we analyze the broadcast of safety-related V2X communications in cellular networks where base stations and vehicles are assumed to share the same spectrum and vehicles broadcast their safety messages to neighboring users."
  },
  {
    "title": "Priority-based Access Control in Vehicular Networks",
    "image": "/assets/research9.png",
    "description": "This paper analyzes priority-based distributed access control in vehicular networks. Characterizing the spatial correlation between vehicles, users, and roads, this paper uses a Cox point process to model vehicles and users, respectively. Then, this paper proposes that each vehicle transmits if it has the highest priority among all of its neighbors."
  }
];

// Publications - 논문 목록 (저널/학회/프리프린트)
export const PUBLICATIONS_DATA = {
  "ieeeLink": "https://ieeexplore.ieee.org/author/37086110155",
  "preprints": [
    {
      "text": "Chang-Sik Choi, \"Analysis of a Highway Vehicular Network with Spatially Consistent Blockage Created by Obstacles,\" submitted to IEEE Transactions on Vehicular Technology",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    }
  ],
  "journals": [
    {
      "text": "Chang-Sik Choi and Francois Baccelli, \"Stochastic Geometry and Dynamical System Analysis of Walker Satellite Constellations,\" accepted to IEEE Transactions on Vehicular Technology",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    },
    {
      "text": "Chang-Sik Choi, Junehyung Kim, and Francois Baccelli, \"Analysis of a Spatially Correlated Vehicular Network Assisted by Cox-distributed Vehicle Relays\" accepted to IEEE Transactions on Vehicular Technology",
      "url": "https://arxiv.org/abs/2204.12243"
    },
    {
      "text": "Chang-Sik Choi*, Leveraging Aerial Platforms for Downlink Communications in Sparse Satellite Networks,\" accepted to IEEE Internet of Things Journal, Nov. 2024",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    },
    {
      "text": "Chang-Sik Choi* and F. Baccelli, \"A Novel Analytical Model for LEO Satellite Constellations Leveraging Cox Point Processes\", accepted to IEEE Transactions on Communications, Sep. 2024",
      "url": "https://arxiv.org/abs/2212.03549"
    },
    {
      "text": "Chang-Sik Choi*, Junehyung Kim, and Junil Choi, \"Stochastic Geometry Analysis of RIS-Assisted Cellular Networks with Reflective Intelligent Surfaces on Roads\", accepted to IEEE Transactions on Communications, Aug. 2024",
      "url": "https://ieeexplore.ieee.org/document/10636275"
    },
    {
      "text": "Chang-Sik Choi* and F. Baccelli, \"Cox Point Processes for Multi-altitude LEO Satellite Networks\", accepted to IEEE Transactions on Vehicular Technology, May 2024",
      "url": "https://ieeexplore.ieee.org/document/10557592"
    },
    {
      "text": "Chang-Sik Choi*, \"Modeling and Analysis of Downlink Communications in a Heterogeneous LEO Satellite Network,\" accepted to IEEE Transactions on Wireless Communications, Jan 2024",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    },
    {
      "text": "Chang-Sik Choi*, \"Analysis of a Delay-Tolerant Data Harvesting Architecture Leveraging Low Earth Orbit Satellite Networks,\" accepted to IEEE Journal on Selected Areas Communications, Dec 2023",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    },
    {
      "text": "Chang-Sik Choi* and F. Baccelli, \"LOS Coverage Area in Vehicular Networks with Cox-Distributed Roadside Units and Relays,\" in IEEE Transactions on Vehicular Technology, vol. 72, no. 6, pp. 7772-7782, June 2023, doi: 10.1109/TVT.2023.3238730.",
      "url": "https://doi.org/10.1109/TVT.2023.3238730"
    },
    {
      "text": "Chang-Sik Choi*, \"User Association in a Heterogeneous Vehicular Network With Roadside Units and Vehicle Relays,\" in IEEE Wireless Communications Letters, vol. 11, no. 11, pp. 2345-2349, Nov. 2022, doi: 10.1109/LWC.2022.3202794.",
      "url": "https://doi.org/10.1109/LWC.2022.3202794"
    },
    {
      "text": "Chang-Sik Choi* and F. Baccelli, \"A Stochastic Geometry Model for Spatially Correlated Blockage in Vehicular Networks,\" in IEEE Internet of Things Journal, vol. 9, no. 20, pp. 19881-19889, 15 Oct.15, 2022, doi: 10.1109/JIOT.2022.3168587.",
      "url": "https://doi.org/10.1109/JIOT.2022.3168587"
    },
    {
      "text": "Chang-Sik Choi*, \"Modeling and Analysis of Priority-Based Distributed Access Control in Vehicular Networks,\" in IEEE Transactions on Vehicular Technology, vol. 71, no. 6, pp. 6848-6852, June 2022, doi: 10.1109/TVT.2022.3162717.",
      "url": "https://doi.org/10.1109/TVT.2022.3162717"
    },
    {
      "text": "Chang-Sik Choi* and F. Baccelli, \"Modeling and Analysis of Vehicle Safety Message Broadcast in Cellular Networks,\" in IEEE Transactions on Wireless Communications, vol. 20, no. 7, pp. 4087-4099, July 2021, doi: 10.1109/TWC.2021.3055837.",
      "url": "https://doi.org/10.1109/TWC.2021.3055837"
    },
    {
      "text": "Chang-Sik Choi*, Gustavo de Veciana, and Francois Baccelli, \"Modeling and Analysis of Data Harvesting Architecture Based on Unmanned Aerial Vehicles,\" IEEE Transactions on Wireless Communications, vol. 19, no. 3, pp. 1825-1838, March 2020",
      "url": "https://ieeexplore.ieee.org/document/8935499"
    },
    {
      "text": "Chang-Sik Choi* and Francois Baccelli, \"Spatial and Temporal Analysis of Direct Communications From Static Devices to Mobile Vehicles, \" IEEE Transactions on Wireless Communications, vol. 18, no. 11, pp. 5128-5140, Nov 2019",
      "url": "https://ieeexplore.ieee.org/document/8796442"
    },
    {
      "text": "Chang-Sik Choi* and Francois Baccelli, \"Poisson Cox Point Processes for Vehicular Networks,\" IEEE Transactions on Vehicular Technology, vol. 67, no. 10, pp. 10160-10165, Oct 2018",
      "url": "https://drive.google.com/file/d/15CmhDDuJtd4ahkNXRBF5ROzrcV8ecApS/view"
    },
    {
      "text": "Chang-Sik Choi* and Francois Baccelli, \"An Analytical Framework for Coverage in Cellular Networks Leveraging Vehicles,\" IEEE Transactions on Communications, vol. 66, no. 10, pp. 4950-4964, Oct 2018",
      "url": "https://ieeexplore.ieee.org/document/8357962"
    },
    {
      "text": "Chang-Sik Choi*, Jae Oh Woo, and Jeffrey Andrews, \"An Analytical Framework for Modeling a Spatially Repulsive Cellular Network,\" IEEE Transactions on Communications, vol. 66, no. 2, pp. 862-874, Feb 2018",
      "url": "https://ieeexplore.ieee.org/document/8089423"
    }
  ],
  "conferences": [
    {
      "text": "Chang-Sik Choi, \"Stochastic Geometry and Dynamical System Analysis of Walker Satellite Constellations,\" EUCNC 6G Workshop on System Analysis of NTN, Poznan, Poland",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    },
    {
      "text": "Chang-Sik Choi and Francois Baccelli, \"Modeling of Correlated Blockage in Highway Vehicular Networks,\" accepted to IEEE GLOBECOM, 2022",
      "url": "https://ieeexplore.ieee.org/author/37086110155"
    },
    {
      "text": "Chang-Sik Choi, Gustavo de Veciana, and Francois Baccelli, \"Analysis of Data Harvesting by Unmanned Aerial Vehicles,\" in Proc. IEEE ISIT, 2019",
      "url": "https://ieeexplore.ieee.org/document/8849230"
    },
    {
      "text": "Chang-Sik Choi, Gustavo de Veciana, and Francois Baccelli, \"Densification Leveraging Mobility: An IoT Architecture Based on Mesh Networking and Vehicles,\" in Proc. ACM Mobihoc, 2018",
      "url": "https://dl.acm.org/doi/10.1145/3209582.3209590"
    },
    {
      "text": "Chang-Sik Choi and Francois Baccelli, \"Modeling and Optimization of Direct Communications from IoT Devices to Vehicles,\" in Proc. IEEE GLOBECOM, 2018",
      "url": "https://ieeexplore.ieee.org/document/8644231"
    },
    {
      "text": "Chang-Sik Choi and Francois Baccelli, \"Coverage Analysis in Cellular Networks with Planar and Vehicular Base Stations,\" in Proc. IEEE ISIT,2018",
      "url": "https://ieeexplore.ieee.org/document/8437846"
    },
    {
      "text": "Chang-Sik Choi, Jae Oh Woo, and Jeffrey Andrews, \"On the coverage probability of a spatially correlated network,\" in Proc. IEEE ISIT, 2017",
      "url": "https://ieeexplore.ieee.org/document/8006571"
    }
  ]
};

// Teaching - 강의 이력
export const TEACHING_DATA = [
  {
    "university": "KAIST",
    "period": "2025 - Present",
    "courses": [
      {
        "name": "Communication Engineering",
        "term": "2026 Spring",
        "level": "undergrad"
      },
      {
        "name": "Communication Engineering",
        "term": "2025 Fall",
        "level": "graduate course"
      }
    ]
  },
  {
    "university": "Sungkyunkwan University",
    "period": "2025",
    "courses": [
      {
        "name": "Python and Matlab Programming",
        "term": "2025 Spring",
        "level": ""
      },
      {
        "name": "Circuit Theory",
        "term": "2025 Spring",
        "level": ""
      },
      {
        "name": "C Programming",
        "term": "2025 Spring",
        "level": ""
      }
    ]
  },
  {
    "university": "Hongik University",
    "period": "2021 March - 2025 Feb",
    "courses": [
      {
        "name": "Linear Algebra",
        "term": "",
        "level": "undergrad"
      },
      {
        "name": "Special Topics in Wireless Communications",
        "term": "",
        "level": ""
      },
      {
        "name": "Engineering Design",
        "term": "",
        "level": "undergrad"
      },
      {
        "name": "Queueing Theory",
        "term": "",
        "level": ""
      },
      {
        "name": "Random Variable and Stochastic Process",
        "term": "",
        "level": "undergrad"
      },
      {
        "name": "Probability and Decision",
        "term": "",
        "level": "grad"
      },
      {
        "name": "Digital Communication",
        "term": "",
        "level": ""
      },
      {
        "name": "Stochastic Process",
        "term": "",
        "level": ""
      },
      {
        "name": "Reinforcement Learning",
        "term": "",
        "level": ""
      },
      {
        "name": "Introduction to Programming and Computation",
        "term": "",
        "level": ""
      },
      {
        "name": "Communication System",
        "term": "",
        "level": ""
      },
      {
        "name": "Linear Estimation",
        "term": "",
        "level": ""
      }
    ]
  }
];

// Projects - 연구비 과제
export const PROJECTS_DATA = {
  "current": [
    {
      "title": "NRF 개인기초 우수신진연구: 확률 기하를 활용한 저궤도 통신 위성망의 4차원 모델링과 분석",
      "period": "2024/04 - 2028/03",
      "role": "Principal Investigator"
    },
    {
      "title": "NRF 한-프 국제협력: 확률기하를 활용한 고밀도 저궤도 위성망 간섭제어기술 연구",
      "period": "2023/10 - 2025/09",
      "role": "Principal Investigator"
    },
    {
      "title": "KAIST New Faculty Research Fund",
      "period": "2025/08 - 2028/07",
      "role": "Principal Investigator"
    }
  ],
  "past": [
    {
      "title": "SKKU New Faculty Research Fund",
      "period": "2025/03 - 2028/02",
      "role": null
    },
    {
      "title": "ETRI: RIS기반 이동통신 네트워크의 연결성 분석",
      "period": "2024/05 - 2024/11",
      "role": "Principal Investigator"
    },
    {
      "title": "ETRI: 확률기하와 공간요소를 고려한 공간요소를 고려한 비정지궤도 위성망과 지상망간 주파수 공유 및 성능 평가",
      "period": "2024/05 - 2024/11",
      "role": "Principal Investigator"
    },
    {
      "title": "ETRI: RIS 기반 이동통신시스템 성능 분석",
      "period": "2023/05 - 2023/11",
      "role": "Principal Investigator"
    },
    {
      "title": "ETRI: 다중 저궤도 위성망과 지상망 환경에서의 효율적 주파수 공유 기술 연구",
      "period": "2023/05 - 2023/11",
      "role": "Principal Investigator"
    },
    {
      "title": "ETRI: 릴레이 활용 응용서비스에 대한 성능 분석",
      "period": "2022/05 - 2022/11",
      "role": "Principal Investigator"
    },
    {
      "title": "ETRI: 도로환경에서 V2I 및 릴레이의 시스템 성능 연구",
      "period": "2021/05 - 2021/11",
      "role": "Principal Investigator"
    },
    {
      "title": "NRF 기본연구 네트워크 센싱을 통한 고밀도 상황에서의 안정성과 지연시간 분석",
      "period": "2021/03 - 2024/02",
      "role": "Principal Investigator"
    },
    {
      "title": "Hongik University New Faculty Research Fund",
      "period": "2021/03 - 2022/02",
      "role": null
    }
  ]
};

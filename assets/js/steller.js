/*!
=========================================================
* Steller Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;
			var navHeight = $('.navbar').outerHeight() || 0;

			$('html, body').animate({
				scrollTop: $(hash).offset().top - navHeight + 1
			}, 700, function(){
				if (history.pushState) {
					history.pushState(null, null, hash);
				} else {
					window.location.hash = hash;
				}
			});
       	}
    });

	var navHeight = $('.navbar').outerHeight() || 0;
	$('body').scrollspy({
		target: '.navbar',
		offset: navHeight + 2
	});
	$('body').scrollspy('refresh');

	initBottomNavActiveState();

	$('#lang-toggle').on('click', function(){
		var nextLang = currentLang === 'bn' ? 'en' : 'bn';
		setLanguage(nextLang);
	});

	initForceDownloadCv();

	initLanguage();
});

var currentLang = 'en';
var translations = {
	en: {
		navHome: 'Home',
		navAbout: 'About',
		navService: 'Service',
		navProjects: 'Projects',
		navUpskilling: 'Upskilling',
		navEducation: 'Education',
		navAchievements: 'Achievements',
		navHobbies: 'Hobbies',
		navContact: 'Contact',
		headerGreeting: 'Hey! I\'m',
		headerName: 'Md Jahidul',
		headerDegree: 'B.Sc in CSE',
		headerDescription: 'Graduate@UAP | Data Analyst | Tech Enthusiast',
		viewCvBtn: 'VIEW CV',
		aboutName: 'Md Jahidul Islam',
		aboutImageAlt: 'About picture',
		aboutParagraph1: 'I am Md Jahidul Islam, a Computer Science and Engineering graduate from the University of Asia Pacific with a strong interest in <b>Web Development</b> and building modern, user-friendly, and scalable web applications using <b>Python, Django, JavaScript, SQL</b>. I also have practical experience in <b>IT support</b> and <b>System configuration</b> through my professional internship. I enjoy solving real-world problems and learning new technologies through projects and practical experience.',
		aboutParagraph2: 'Beyond web development, I am actively exploring <b>Cloud Computing</b> and <b>Cybersecurity</b>, expanding my knowledge of cloud platforms, secure application development, networking, and industry best practices. I am passionate about continuous learning, embracing emerging technologies, and contributing to innovative, technology-driven solutions.',
		aboutWhyMe: 'Why Me?',
		aboutWhyMeLine1: 'I really like what I do.',
		aboutWhyMeLine2: 'I keep learning new things.',
		aboutWhyMeLine3: 'I like working with others.',
		downloadCvBtn: 'DOWNLOAD CV',
		serviceTitle: 'What I Do',
		serviceIntro: 'I try to give my 110% in every work I do. <br> Always learning, always improving.',
		serviceCardWeb: 'Web Development',
		serviceCardBackend: 'Backend Development',
		serviceCardData: 'Data Analyst',
		serviceCardIT: 'IT Support',
		skillsTitle: 'Areas of Expertise',
		skillsIntro: 'Not saying I am pro at all these! <br>Learning and always trying to do better.',
		skillsItem1: 'Python, C, Java',
		skillsItem2: 'HTML, CSS, JavaScript',
		skillsItem3: 'Django, Bootstrap',
		skillsItem4: 'Data Structures & Algorithms',
		skillsItem5: 'OOP & Software Development',
		skillsItem6: 'IT Support & Troubleshooting',
		skillsItem7: 'GitHub',
		skillsItem8: 'Microsoft Office',
		skillsItem9: 'Canva, Camtasia',
		softSkillsTitle: 'Soft Skills',
		softSkillsIntro: 'Skills Outside the Coding',
		softSkillCommunication: 'Communication',
		softSkillTeamwork: 'Teamwork',
		softSkillTime: 'Time Management',
		softSkillCustomerService: 'Customer Service',
		portfolioTitle: 'Projects',
		portfolioSectionTitle: 'Check My Works',
		portfolioIntro: 'Don\'t have a lot of awesome project right now ; <br>But looking forward to working on more projects!',
		project1Title: 'Ride Schedule <span class="subtitle">— Academic Project</span>',
		project1Desc: 'Ride Scheduling and Service Management System. Riders can post daily, weekly, or monthly ride schedules and drivers can manage ride requests. Includes service-based ride features like parcel and pharmacy-related rides, fare estimation through CostBot, ratings, and notifications.',
		projectTechLabel: 'Tech used:',
		project1Tech: 'Django, HTML, CSS, JavaScript, Bootstrap',
		projectViewLink: 'View on GitHub',
		project2Title: 'Mini Compiler <span class="subtitle">— Academic Project</span>',
		project2Desc: 'A complete end-to-end mini-compiler built in Python featuring tokenization, AST generation, type/semantic checking, Three-Address Code (TAC) generation, a peephole optimizer, stack-machine code generation, and a custom Virtual Machine runtime.',
		project2Tech: 'Python',
		project3Title: 'Square_Analog_Clock <span class="subtitle">— Academic Project</span>',
		project3Desc: 'A modern analog clock with a squircle (rounded-square) dial, dynamic shadows, smoothly sweeping hands, and an animated pendulum. Built it for Computer Graphics Lab.',
		project3Tech: 'C++ and OpenGL/GLUT',
		moreProjects: 'More projects coming soon!',
		upskillingTitle: 'Certifications & Training',
		upskillingIntro: 'Courses and hands-on training I\'ve completed',
		cert1Title: 'Data Analyst with SQL & Python',
		cert1Desc: 'Certification course completed at Farhan\'s Academy — 3 months duration.',
		viewCertificateBtn: 'View Certificate',
		viewCertificatesBtn: 'View Certificates',
		cert2Title: 'Hardware & Software Internship',
		cert2Desc: 'Daffodil Computers Ltd. — 3-month on-site internship (June–Sept 2025), Dhaka.',
		viewAppointmentBtn: 'View Appointment Letter',
		educationTitle: 'Educational Background',
		educationIntro: 'A little about my <br>School,College,University',
		educationUniversityAlt: 'University icon',
		educationUniversity: 'University',
		educationUniversityName: 'University of Asia Pacific (UAP)',
		educationUniversityDegree: 'B.Sc in Computer Science and Engineering',
		educationUniversityDates: 'CGPA: 3.78 | Jan 2022 - Dec 2025',
		educationCollegeAlt: 'College icon',
		educationCollege: 'College',
		educationCollegeName: 'Dhaka City College',
		educationCollegeDegree: 'HSC, Science - GPA 5.00 (2020)',
		educationSchoolAlt: 'School icon',
		educationSchool: 'School',
		educationSchoolName: 'B. N College',
		educationSchoolDegree: 'SSC, Science - GPA 5.00 (2018)',
		achievementsTitle: 'Achievements & Awards',
		achievementsIntro: 'Some milestones along the way',
		achievementRoboTitle: 'Robo Expo Champion',
		achievementRoboDesc: 'Champion, UAP Robo Expo 2.0 LFR Competition — Team_Optimal.',
		achievementVC: 'Vice Chancellor\'s Award',
		achievementVCDesc: 'Awarded in Fall 2024 and Spring 2025 for academic excellence.',
		achievementDean: 'Dean\'s Award',
		achievementDeanDesc: 'Awarded in Fall 2022 and Spring 2024 for academic excellence.',
		achievementContests: 'Programming Contests',
		achievementContestsDesc: 'Participated in Intra-University Programming Contest 1.0 (2022) and EEE Tech Fest (2023) at UAP.',
		achievementLFR: 'LFR Competitions',
		achievementLFRDesc: 'Participated in KUET BitFest 2025 and UIU CSE Fest 2025 LFR Competitions with UAP_Optimal.',
		modalCertDataAnalystTitle: 'Data Analyst with SQL & Python Certificate',
		modalCertDataAnalystAlt: 'Data Analyst with SQL and Python Certificate',
		modalCertInternshipTitle: 'Internship Appointment Letter',
		modalCertInternshipAlt: 'Internship Appointment Letter',
		modalCertRoboTitle: 'Robo Expo Champion Certificate',
		modalCertRoboAlt: 'Robo Expo Certificate',
		modalCertVCTitle: 'Vice Chancellor\'s Award Certificates',
		modalCertVCAlt1: 'VC Award Fall 2024',
		modalCertVCAlt2: 'VC Award Spring 2025',
		modalCertDeanTitle: 'Dean\'s Award Certificates',
		modalCertDeanAlt1: 'Dean\'s Award Fall 2022',
		modalCertDeanAlt2: 'Dean\'s Award Spring 2024',
		modalCertContestsTitle: 'Programming Contest Certificates',
		modalCertContestsAlt1: 'Intra Programming Contest 2022',
		modalCertContestsAlt2: 'EEE Tech Fest 2023',
		modalCertLFRTitle: 'LFR Competition Certificates',
		modalCertLFRAlt1: 'KUET BitFest 2025',
		modalCertLFRAlt2: 'UIU CSE Fest 2025',
		modalCertLFRAlt3: 'National Robotics Championship 2025',
		hobbiesTitle: 'Hobbies',
		hobbiesIntro: 'What I love to do when I\'m not working!',
		hobbyTravelAlt: 'Travel',
		hobbyTravel: 'Travel',
		hobbyTravelDesc: 'I love exploring new places and experiencing different cultures whenever I get the chance.',
		hobbyPhotographyAlt: 'Photography',
		hobbyPhotography: 'Photography',
		hobbyPhotographyDesc: 'I enjoy capturing moments and landscapes through the lens, especially while traveling.',
		hobbyPlantingAlt: 'Planting Trees',
		hobbyPlanting: 'Planting Trees',
		hobbyPlantingDesc: 'I like spending time outdoors planting trees, contributing my bit toward a greener environment.',
		hobbyCyclingAlt: 'Cycling',
		hobbyCycling: 'Cycling',
		hobbyCyclingDesc: 'Cycling helps me stay active and clear my head — a great way to unwind after a long day.',
		hireTitle: 'Open to Job Opportunities',
		hireDescription: 'Looking for a full stack / backend developer? Let\'s talk about how I can contribute to your team.',
		hireButton: 'Hire Me!',
		hireEmailText: 'or email me directly',
		contactTitle: 'Contacts',
		contactSubtitle: 'Get In Touch With Me',
		contactAvailability: 'Available 24/7',
		contactEmailLabel: 'Email Address',
		contactPhoneLabel: 'Phone Number',
		contactLocationLabel: 'Location',
		footerFindMe: 'Find me in'
	},
	bn: {
		navHome: 'হোম',
		navAbout: 'আমার সম্পর্কে',
		navService: 'সেবা',
		navProjects: 'প্রকল্প',
		navUpskilling: 'প্রশিক্ষণ',
		navEducation: 'শিক্ষা',
		navAchievements: 'সাফল্য',
		navHobbies: 'শখ',
		navContact: 'যোগাযোগ',
		headerGreeting: 'হ্যালো! আমি',
		headerName: 'মোঃ জাহিদুল',
		headerDegree: 'বি.এসসি ইন সি.এস.ই',
		headerDescription: 'গ্রাজুয়েট@ইউএপি | ডেটা বিশ্লেষক | প্রযুক্তি অনুরাগী',
		viewCvBtn: 'সিভি দেখুন',
		aboutName: 'মোঃ জাহিদুল ইসলাম',
		aboutImageAlt: 'আমার সম্পর্কে ছবি',
		aboutParagraph1: 'আমি মোঃ জাহিদুল ইসলাম, ইউনিভার্সিটি অফ এশিয়া প্যাসিফিক থেকে কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং এ স্নাতক। আমি <b>ওয়েব ডেভেলপমেন্ট</b> এ আগ্রহী এবং আধুনিক, ব্যবহারকারী-বান্ধব ও মাপকাঠিপূর্ণ ওয়েব অ্যাপ্লিকেশন তৈরি করতে <b>Python, Django, JavaScript, SQL</b> ব্যবহার করি। আমি একটি পেশাদার ইন্টার্নশিপের মাধ্যমে <b>আইটি সাপোর্ট</b> এবং <b>সিস্টেম কনফিগারেশন</b> এ বাস্তব অভিজ্ঞতা অর্জন করেছি। আমি বাস্তব-জগৎ সমস্যাগুলি সমাধান করতে এবং প্রকল্পের মাধ্যমে নতুন প্রযুক্তি শিখতে ভালোবাসি।',
		aboutParagraph2: 'ওয়েব ডেভেলপমেন্ট ছাড়াও আমি সক্রিয়ভাবে <b>ক্লাউড কম্পিউটিং</b> এবং <b>সাইবারসিকিউরিটি</b> অন্বেষণ করছি, ক্লাউড প্ল্যাটফর্ম, নিরাপদ অ্যাপ্লিকেশন ডেভেলপমেন্ট, নেটওয়ার্কিং এবং শিল্পের সেরা অনুশীলন সম্পর্কে আমার জ্ঞান বাড়াচ্ছি। আমি ধারাবাহিক শেখার, উদীয়মান প্রযুক্তি গ্রহণ এবং উদ্ভাবনী প্রযুক্তি চালিত সমাধানে অবদান রাখতে আগ্রহী।',
		aboutWhyMe: 'কেন আমি?',
		aboutWhyMeLine1: 'আমি যা করি তা সত্যিই পছন্দ করি।',
		aboutWhyMeLine2: 'আমি নতুন কিছু শিখতে থাকি।',
		aboutWhyMeLine3: 'আমি অন্যদের সাথে কাজ করতে পছন্দ করি।',
		downloadCvBtn: 'সিভি ডাউনলোড করুন',
		serviceTitle: 'আমি কী করি',
		serviceIntro: 'আমি আমার প্রতিটি কাজে ১১০% দেওয়ার চেষ্টা করি। <br> সবসময় শিখছি, সবসময় উন্নতি করছি।',
		serviceCardWeb: 'ওয়েব ডেভেলপমেন্ট',
		serviceCardBackend: 'ব্যাকএন্ড ডেভেলপমেন্ট',
		serviceCardData: 'ডেটা বিশ্লেষক',
		serviceCardIT: 'আইটি সাপোর্ট',
		skillsTitle: 'দক্ষতার ক্ষেত্র',
		skillsIntro: 'আমি এই সবের প্রো নই বলছি না! <br>অবিরত শিখছি এবং আরো ভাল হতে চেষ্টা করছি।',
		skillsItem1: 'Python, C, Java',
		skillsItem2: 'HTML, CSS, JavaScript',
		skillsItem3: 'Django, Bootstrap',
		skillsItem4: 'ডেটা স্ট্রাকচার ও অ্যালগরিদম',
		skillsItem5: 'OOP ও সফটওয়্যার ডেভেলপমেন্ট',
		skillsItem6: 'আইটি সাপোর্ট ও সমস্যা সমাধান',
		skillsItem7: 'GitHub',
		skillsItem8: 'Microsoft Office',
		skillsItem9: 'Canva, Camtasia',
		softSkillsTitle: 'সফট স্কিল',
		softSkillsIntro: 'কোডিংয়ের বাইরের দক্ষতা',
		softSkillCommunication: 'যোগাযোগ',
		softSkillTeamwork: 'দলগত কাজ',
		softSkillTime: 'সময় ব্যবস্থাপনা',
		softSkillCustomerService: 'কাস্টমার সার্ভিস',
		portfolioTitle: 'প্রকল্প',
		portfolioSectionTitle: 'আমার কাজ দেখুন',
		portfolioIntro: 'এখন হয়তো খুব বেশি চমৎকার প্রকল্প নেই; <br>কিন্তু নতুন প্রকল্পে কাজ করার জন্য উন্মুখ।',
		project1Title: 'Ride Schedule <span class="subtitle">— একাডেমিক প্রকল্প</span>',
		project1Desc: 'Ride Scheduling এবং Service Management System। রাইডাররা দৈনিক, সাপ্তাহিক বা মাসিক রাইড শিডিউল পোস্ট করতে পারে এবং ড্রাইভাররা রাইড অনুরোধ পরিচালনা করতে পারে। এতে পার্সেল ও ফার্মেসি-ভিত্তিক রাইড, CostBot দ্বারা ভাড়া পূর্বাভাস, রেটিং এবং বিজ্ঞপ্তি সুবিধা অন্তর্ভুক্ত।',
		projectTechLabel: 'ব্যবহৃত প্রযুক্তি:',
		project1Tech: 'Django, HTML, CSS, JavaScript, Bootstrap',
		projectViewLink: 'GitHub-এ দেখুন',
		project2Title: 'Mini Compiler <span class="subtitle">— একাডেমিক প্রকল্প</span>',
		project2Desc: 'Python-এ নির্মিত একটি সম্পূর্ণ end-to-end মিনি-কম্পাইলার যা টোকেনাইজেশন, AST তৈরি, টাইপ/সেমান্টিক চেকিং, Three-Address Code (TAC) উৎপাদন, পিপহোল অপ্টিমাইজার, স্ট্যাক-মেশিন কোড জেনারেশন এবং একটি কাস্টম ভার্চুয়াল মেশিন runtime অন্তর্ভুক্ত করে।',
		project2Tech: 'Python',
		project3Title: 'Square_Analog_Clock <span class="subtitle">— একাডেমিক প্রকল্প</span>',
		project3Desc: 'একটি আধুনিক অ্যানালগ ঘড়ি যার স্কয়ারল (আয়তাকার-রাউন্ডেড) ডায়াল, ডায়নামিক শ্যাডো, মসৃণভাবে ঘোরানো হাত এবং অ্যানিমেটেড পেন্ডুলাম রয়েছে। এটি Computer Graphics Lab-এর জন্য তৈরি করা হয়।',
		project3Tech: 'C++ এবং OpenGL/GLUT',
		moreProjects: 'আরও প্রকল্প শীঘ্রই আসছে!',
		upskillingTitle: 'সার্টিফিকেশন ও প্রশিক্ষণ',
		upskillingIntro: 'কোর্স এবং ব্যবহারিক প্রশিক্ষণ যা আমি সম্পন্ন করেছি',
		cert1Title: 'SQL & Python সহ Data Analyst',
		cert1Desc: 'Farhan\'s Academy-তে ৩ মাস মেয়াদী সার্টিফিকেশন কোর্স সম্পন্ন করেছি।',
		viewCertificateBtn: 'সার্টিফিকেট দেখুন',
		viewCertificatesBtn: 'সার্টিফিকেটগুলো দেখুন',
		cert2Title: 'হার্ডওয়্যার ও সফটওয়্যার ইন্টার্নশিপ',
		cert2Desc: 'Daffodil Computers Ltd. — ৩ মাস অন-সাইট ইন্টার্নশিপ (জুন–সেপ্টেম্বর ২০২৫), ঢাকা।',
		viewAppointmentBtn: 'অ্যাপয়েন্টমেন্ট লেটার দেখুন',
		educationTitle: 'শিক্ষাগত পটভূমি',
		educationIntro: 'আমার স্কুল, কলেজ, বিশ্ববিদ্যালয় সম্পর্কে কিছু',
		educationUniversityAlt: 'বিশ্ববিদ্যালয়ের চিত্র',
		educationUniversity: 'বিশ্ববিদ্যালয়',
		educationUniversityName: 'এশিয়া প্যাসিফিক বিশ্ববিদ্যালয় (ইউএপি)',
		educationUniversityDegree: 'বি.এসসি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং',
		educationUniversityDates: 'CGPA: 3.78 | জানু ২০২২ - ডিসে ২০২৫',
		educationCollegeAlt: 'কলেজের চিত্র',
		educationCollege: 'কলেজ',
		educationCollegeName: 'ঢাকা সিটি কলেজ',
		educationCollegeDegree: 'এইচএসসি, বিজ্ঞান - GPA 5.00 (২০২০)',
		educationSchoolAlt: 'স্কুলের চিত্র',
		educationSchool: 'স্কুল',
		educationSchoolName: 'বি. এন. কলেজ',
		educationSchoolDegree: 'এসএসসি, বিজ্ঞান - GPA 5.00 (২০১৮)',
		achievementsTitle: 'সাফল্য ও পুরস্কার',
		achievementsIntro: 'যাত্রাপথে কিছু মাইলফলক',
		achievementRoboTitle: 'রোবো এক্সপো চ্যাম্পিয়ন',
		achievementRoboDesc: 'চ্যাম্পিয়ন, UAP Robo Expo 2.0 LFR Competition — Team_Optimal.',
		achievementVC: 'ভাইস চ্যান্সেলরের পুরস্কার',
		achievementVCDesc: 'একাডেমিক উৎকর্ষতার জন্য Fall 2024 এবং Spring 2025-এ পুরস্কৃত।',
		achievementDean: 'ডিনের পুরস্কার',
		achievementDeanDesc: 'একাডেমিক উৎকর্ষতার জন্য Fall 2022 এবং Spring 2024-এ পুরস্কৃত।',
		achievementContests: 'প্রোগ্রামিং প্রতিযোগিতা',
		achievementContestsDesc: 'UAP-এ Intra-University Programming Contest 1.0 (2022) এবং EEE Tech Fest (2023)-এ অংশগ্রহণ করেছি।',
		achievementLFR: 'LFR প্রতিযোগিতা',
		achievementLFRDesc: 'KUET BitFest 2025 এবং UIU CSE Fest 2025-এ UAP_Optimal-সহ অংশগ্রহণ করেছি।',
		modalCertDataAnalystTitle: 'SQL & Python সহ Data Analyst সার্টিফিকেট',
		modalCertDataAnalystAlt: 'SQL এবং Python সহ Data Analyst সার্টিফিকেট',
		modalCertInternshipTitle: 'ইন্টার্নশিপ অ্যাপয়েন্টমেন্ট লেটার',
		modalCertInternshipAlt: 'ইন্টার্নশিপ অ্যাপয়েন্টমেন্ট লেটার',
		modalCertRoboTitle: 'রোবো এক্সপো চ্যাম্পিয়ন সার্টিফিকেট',
		modalCertRoboAlt: 'রোবো এক্সপো সার্টিফিকেট',
		modalCertVCTitle: 'ভাইস চ্যান্সেলরের পুরস্কার সার্টিফিকেট',
		modalCertVCAlt1: 'ভিসি পুরস্কার ফাল ২০২৪',
		modalCertVCAlt2: 'ভিসি পুরস্কার স্প্রিং ২০২৫',
		modalCertDeanTitle: 'ডিনের পুরস্কার সার্টিফিকেট',
		modalCertDeanAlt1: 'ডিনের পুরস্কার ফাল ২০২২',
		modalCertDeanAlt2: 'ডিনের পুরস্কার স্প্রিং ২০২৪',
		modalCertContestsTitle: 'প্রোগ্রামিং প্রতিযোগিতা সার্টিফিকেট',
		modalCertContestsAlt1: 'Intra Programming Contest 2022',
		modalCertContestsAlt2: 'EEE Tech Fest 2023',
		modalCertLFRTitle: 'LFR প্রতিযোগিতা সার্টিফিকেট',
		modalCertLFRAlt1: 'KUET BitFest 2025',
		modalCertLFRAlt2: 'UIU CSE Fest 2025',
		modalCertLFRAlt3: 'National Robotics Championship 2025',
		hobbiesTitle: 'শখ',
		hobbiesIntro: 'আমি কাজ না করলে যা করতে ভালোবাসি!',
		hobbyTravelAlt: 'ভ্রমণের ছবি',
		hobbyTravel: 'ভ্রমণ',
		hobbyTravelDesc: 'আমি নতুন জায়গা আবিষ্কার করতে এবং বিভিন্ন সংস্কৃতি অনুভব করতে ভালোবাসি।',
		hobbyPhotographyAlt: 'ফটোগ্রাফির ছবি',
		hobbyPhotography: 'ফটোগ্রাফি',
		hobbyPhotographyDesc: 'আমি লেন্সের মাধ্যমে মুহূর্ত এবং দৃশ্য পরিষ্কার করতে পছন্দ করি, বিশেষ করে ভ্রমণের সময়।',
		hobbyPlantingAlt: 'গাছ লাগানোর ছবি',
		hobbyPlanting: 'গাছ লাগানো',
		hobbyPlantingDesc: 'আমি বাইরে গাছ লাগাতে সময় কাটাতে ভালোবাসি, পরিবেশকে আরও সবুজ করতে সাহায্য করি।',
		hobbyCyclingAlt: 'সাইক্লিং ছবি',
		hobbyCycling: 'সাইক্লিং',
		hobbyCyclingDesc: 'সাইক্লিং আমাকে সক্রিয় থাকতে এবং মস্তিষ্ক পরিষ্কার রাখতে সাহায্য করে — দীর্ঘ দিনের পরে আরাম করার একটি চমৎকার উপায়।',
		hireTitle: 'চাকরির সুযোগে উন্মুক্ত',
		hireDescription: 'ফুল স্ট্যাক/ব্যাকএন্ড ডেভেলপার খুঁজছেন? চলুন আলাপ করি কীভাবে আমি আপনার টিমে অবদান রাখতে পারি।',
		hireButton: 'আমাকে নিয়োগ করুন!',
		hireEmailText: 'অথবা সরাসরি ইমেইল করুন',
		contactTitle: 'যোগাযোগ',
		contactSubtitle: 'আমার সাথে যোগাযোগ করুন',
		contactAvailability: 'দিবাগত উপলব্ধ',
		contactEmailLabel: 'ইমেইল ঠিকানা',
		contactPhoneLabel: 'ফোন নম্বর',
		contactLocationLabel: 'অবস্থান',
		footerFindMe: 'আমাকে খুঁজুন'
	}
};

function applyTranslations(lang) {
	$('[data-i18n]').each(function() {
		var key = $(this).attr('data-i18n');
		var text = translations[lang][key];
		if (typeof text !== 'undefined') {
			$(this).text(text);
		}
	});

	$('[data-i18n-html]').each(function() {
		var key = $(this).attr('data-i18n-html');
		var html = translations[lang][key];
		if (typeof html !== 'undefined') {
			$(this).html(html);
		}
	});

	$('[data-i18n-alt]').each(function() {
		var key = $(this).attr('data-i18n-alt');
		var altText = translations[lang][key];
		if (typeof altText !== 'undefined') {
			$(this).attr('alt', altText);
		}
	});

	document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
	updateLangToggleLabel();
}

function setLanguage(lang) {
	if (!translations[lang]) {
		lang = 'en';
	}
	currentLang = lang;
	applyTranslations(lang);
	localStorage.setItem('selectedLanguage', lang);
}

function initLanguage() {
	var savedLang = localStorage.getItem('selectedLanguage');
	if (savedLang === 'bn' || savedLang === 'en') {
		currentLang = savedLang;
	} else {
		currentLang = 'en';
	}
	setLanguage(currentLang);
}

// The plain HTML `download` attribute is unreliable for PDFs in several
// browsers (notably Safari, which opens the built-in PDF viewer instead of
// saving the file regardless of the attribute). Fetching the file ourselves
// and triggering the save via a blob URL works consistently across
// Chrome, Firefox, Edge, and modern Safari/iOS Safari.
function initForceDownloadCv() {
	var link = document.getElementById('downloadCvLink');
	if (!link) {
		return;
	}

	link.addEventListener('click', function(event) {
		// If the browser can't do fetch/blob downloads, just let the
		// normal <a download> / navigation behavior happen.
		if (!window.fetch || !window.Blob || typeof document.createElement('a').download === 'undefined') {
			return;
		}

		event.preventDefault();

		var fileUrl = link.getAttribute('href');
		var fileName = link.getAttribute('download') || 'Jahidul_CV.pdf';

		fetch(fileUrl)
			.then(function(response) {
				if (!response.ok) {
					throw new Error('Network response was not OK');
				}
				return response.blob();
			})
			.then(function(blob) {
				var blobUrl = URL.createObjectURL(blob);
				var tempLink = document.createElement('a');
				tempLink.href = blobUrl;
				tempLink.download = fileName;
				document.body.appendChild(tempLink);
				tempLink.click();
				document.body.removeChild(tempLink);
				setTimeout(function() {
					URL.revokeObjectURL(blobUrl);
				}, 1000);
			})
			.catch(function() {
				// Fetch failed (e.g. offline) - fall back to a normal
				// navigation so the user can still get the file.
				window.location.href = fileUrl;
			});
	});
}

function updateLangToggleLabel() {
	if ($('#lang-toggle').length) {
		$('#lang-toggle').text(currentLang === 'bn' ? 'English' : 'বাংলা');
	}
}

// Highlights the current section's icon in the mobile bottom nav as the
// user scrolls, and keeps the active icon scrolled into view within the
// horizontally-scrollable bar. Progressive enhancement: does nothing in
// browsers without IntersectionObserver, and the links still work as
// plain anchors either way.
function initBottomNavActiveState() {
	var bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
	if (!bottomNavLinks.length || !('IntersectionObserver' in window)) {
		return;
	}

	var sectionMap = [];
	bottomNavLinks.forEach(function(link) {
		var hash = link.getAttribute('href');
		var target = hash ? document.querySelector(hash) : null;
		if (target) {
			sectionMap.push({ link: link, target: target });
		}
	});

	if (!sectionMap.length) {
		return;
	}

	function setActive(link) {
		bottomNavLinks.forEach(function(l) {
			l.classList.remove('active');
			l.removeAttribute('aria-current');
		});
		link.classList.add('active');
		link.setAttribute('aria-current', 'true');

		if (typeof link.scrollIntoView === 'function') {
			link.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
		}
	}

	var observer = new IntersectionObserver(function(entries) {
		var visible = entries
			.filter(function(entry) { return entry.isIntersecting; })
			.sort(function(a, b) { return b.intersectionRatio - a.intersectionRatio; });

		if (visible.length) {
			var match = sectionMap.filter(function(item) { return item.target === visible[0].target; })[0];
			if (match) {
				setActive(match.link);
			}
		}
	}, {
		root: null,
		rootMargin: '-40% 0px -50% 0px',
		threshold: [0, 0.25, 0.5, 0.75, 1]
	});

	sectionMap.forEach(function(item) {
		observer.observe(item.target);
	});
}

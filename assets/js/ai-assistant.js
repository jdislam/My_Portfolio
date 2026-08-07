/*!
=========================================================
* ChatBot — Jahidul's portfolio assistant
* ---------------------------------------------------------
* A self-contained, local (no external API calls) FAQ-style
* assistant. It answers visitor questions about Jahidul by
* matching the question against a small keyword-scored
* knowledge base built from this portfolio's own content.
*
* Why local instead of a real LLM API?
* This site is a static, client-only page (GitHub Pages).
* Calling a real AI API from the browser would require
* embedding a secret API key in public JS, which anyone
* could copy and abuse. A backend proxy would be needed for
* that instead. This local engine needs no server, no key,
* costs nothing, and answers instantly.
=========================================================
*/

(function () {
	'use strict';

	// ---------------------------------------------------------------
	// Knowledge base: each intent has trigger keywords/phrases and a
	// response. Keep responses short and in Jahid's own info.
	//
	// Ordering matters for tie-breaks: findResponse() picks the first
	// entry with the highest score when two entries tie, so specific
	// content intents are listed before the generic closing intents
	// (off_topic / thanks / no_more / bye) near the end. That way a
	// message like "no, tell me about his skills" still resolves to
	// skills_tech instead of the bare "no" closing intent.
	// ---------------------------------------------------------------
	var KB = [
		{
			id: 'greeting',
			patterns: ['hi', 'hello', 'hey', 'yo', 'salam', 'assalamu', 'good morning', 'good afternoon', 'good evening'],
			response: "Hello! How can I assist you today? Ask me about his skills, projects, education, or how to get in touch — or tap one of the quick questions below."
		},
		{
			id: 'who',
			patterns: ['who are you', 'what are you', 'your name', 'about you', 'are you real', 'are you ai', 'are you a bot'],
			response: "I'm ChatBot, a small built-in assistant on this portfolio — I answer questions about Jahidul using the info on this page, no external service involved. What would you like to know about him?"
		},
		{
			id: 'about',
			patterns: ['who is jahidul', 'who is jahid', 'about jahid', 'about jahidul', 'tell me about him', 'introduce', 'introduction', 'his background', 'who is he'],
			response: "Md Jahidul Islam is a Computer Science & Engineering graduate from the University of Asia Pacific, focused on web development with Python, Django, JavaScript and SQL. He also has hands-on IT support and system configuration experience, and is currently exploring Cloud Computing and Cybersecurity."
		},
		{
			id: 'services',
			patterns: ['service', 'services', 'what does he do', 'what do you do', 'what does he offer', 'web development', 'backend development', 'data analyst', 'it support', 'data analysis'],
			response: "He works across four areas: Web Development, Backend Development (Python/Django), Data Analysis, and IT Support. Check the \"What I Do\" section for a quick overview of each."
		},
		{
			id: 'skills_tech',
			patterns: ['skill', 'skills', 'tech stack', 'technologies', 'programming language', 'programming languages', 'stack', 'what can he do', 'expertise', 'coding skills', 'tools he uses'],
			response: "His core technical skills: Python, C, Java; HTML, CSS, JavaScript; Django & Bootstrap; Data Structures & Algorithms; OOP & Software Development; plus GitHub, Microsoft Office, and IT support/troubleshooting."
		},
		{
			id: 'skills_soft',
			patterns: ['soft skill', 'soft skills', 'communication', 'teamwork', 'time management', 'customer service'],
			response: "On the soft-skills side he rates strong in Communication, Teamwork, Time Management, and Customer Service — built through internships, contests, and team projects."
		},
		{
			id: 'why_hire',
			patterns: ['why hire him', 'why should i hire', 'why hire', 'strengths', 'what makes him different', 'why choose him', 'why him'],
			response: "He genuinely enjoys the work, keeps learning new things, and works well with others — backed by real project and internship experience across web development, data analysis, and IT support. He's currently open to full-stack / backend opportunities."
		},
		{
			id: 'projects',
			patterns: ['project', 'projects', 'what has he built', 'portfolio work', 'work samples'],
			response: "Three projects are featured: \"Ride Schedule\" (a Django ride scheduling & service management system), \"Mini Compiler\" (a full Python compiler pipeline: tokenizer to a custom VM), and \"Square Analog Clock\" (a C++/OpenGL animated clock). Want details on any one of these?"
		},
		{
			id: 'project_ride',
			patterns: ['ride schedule', 'ride scheduling', 'rideshare', 'costbot'],
			response: "Ride Schedule is a Django ride scheduling & service management system — riders post daily/weekly/monthly ride schedules, drivers manage requests, and it includes parcel/pharmacy-style rides, fare estimation via CostBot, ratings, and notifications. Built with Django, HTML, CSS, JavaScript, and Bootstrap. See it on GitHub: github.com/jdislam/Ride_Schedule"
		},
		{
			id: 'project_compiler',
			patterns: ['mini compiler', 'compiler'],
			response: "Mini Compiler is an end-to-end compiler built in Python: tokenization, AST generation, type/semantic checking, Three-Address Code generation, a peephole optimizer, stack-machine codegen, and a custom Virtual Machine runtime. Repo: github.com/jdislam/Mini_Compiler"
		},
		{
			id: 'project_clock',
			patterns: ['analog clock', 'square analog', 'opengl', 'glut', 'computer graphics'],
			response: "Square Analog Clock is a squircle-dial analog clock with dynamic shadows, smoothly sweeping hands, and an animated pendulum — built in C++ with OpenGL/GLUT for a Computer Graphics Lab. Repo: github.com/jdislam/squircle-analog-clock"
		},
		{
			id: 'education',
			patterns: ['education', 'study', 'studied', 'university', 'college', 'school', 'degree', 'cgpa', 'gpa', 'academic background', 'qualification', 'qualifications'],
			response: "University: B.Sc in Computer Science & Engineering, University of Asia Pacific (UAP) — CGPA 3.78, Jan 2022–Dec 2025. College: Dhaka City College, HSC Science, GPA 5.00 (2020). School: B. N College, SSC Science, GPA 5.00 (2018)."
		},
		{
			id: 'upskilling',
			patterns: ['certification', 'certifications', 'certificate', 'training', 'course', 'internship', 'upskilling', 'work experience', 'daffodil'],
			response: "He completed a \"Data Analyst with SQL & Python\" certification at Farhan's Academy (3 months), and a 3-month Hardware & Software internship at Daffodil Computers Ltd. in Dhaka (June–Sept 2025)."
		},
		{
			id: 'achievements',
			patterns: ['achievement', 'achievements', 'award', 'awards', 'competition', 'contest', 'champion', 'accomplishment', 'accomplishments', 'recognition'],
			response: "Highlights: Robo Expo 2.0 LFR Champion (Team_Optimal); Vice Chancellor's Award (Fall 2024 & Spring 2025); Dean's Award (Fall 2022 & Spring 2024); Intra-University Programming Contest & EEE Tech Fest participation; and LFR competitions at KUET BitFest 2025, UIU CSE Fest 2025, and the National Robotics Championship."
		},
		{
			id: 'hobbies',
			patterns: ['hobby', 'hobbies', 'free time', 'interest', 'interests', 'fun', 'outside work', 'outside of work'],
			response: "Outside of coding he enjoys Travel, Photography, Planting Trees, and Cycling."
		},
		{
			id: 'contact',
			patterns: ['contact', 'reach', 'email', 'phone', 'number', 'mail', 'get in touch', 'email address', 'phone number', 'whatsapp'],
			response: "You can reach him at prithonjahid2480@gmail.com or +880 1822-771136. He's based in Dhaka, Bangladesh. There's also a \"Hire Me!\" button in the Contact section that opens a pre-filled email."
		},
		{
			id: 'location',
			patterns: ['location', 'where does he live', 'based', 'dhaka', 'city', 'country'],
			response: "He's based in Dhaka, Bangladesh."
		},
		{
			id: 'social',
			patterns: ['github', 'linkedin', 'facebook', 'instagram', 'social media', 'social link', 'social links'],
			response: "GitHub: github.com/jdislam · LinkedIn: linkedin.com/in/mdjahidulislam155 · Facebook & Instagram: jdislam155. Links are also in the header and footer of this page."
		},
		{
			id: 'cv',
			patterns: ['cv', 'resume', 'download cv', 'view cv', 'download resume', 'portfolio pdf'],
			response: "You can view or download his CV using the \"VIEW CV\" button in the header, or \"DOWNLOAD CV\" in the About section."
		},
		{
			id: 'hire',
			patterns: ['hire', 'job', 'opportunity', 'available', 'looking for work', 'open to work', 'freelance', 'recruit', 'recruiting', 'vacancy'],
			response: "Yes — he's open to full-stack / backend developer opportunities. Use the \"Hire Me!\" button or email him directly at prithonjahid2480@gmail.com."
		},
		{
			id: 'off_topic',
			patterns: ['joke', 'weather', 'girlfriend', 'boyfriend', 'married', 'marry', 'favorite color', 'favourite color', 'favorite food', 'favourite food', 'sing a song', 'tell me a story', 'president of', 'capital of', 'how old are you', 'his age', 'your age', 'zodiac', 'horoscope', 'relationship status', 'meaning of life', 'weather today'],
			response: "That's a bit outside what I can help with — I'm focused on Jahidul's professional background. Is there anything about his skills, projects, education, or experience you'd like to know?"
		},
		{
			id: 'thanks',
			patterns: ['thank', 'thanks', 'thank you', 'thx', 'appreciate'],
			response: "You're welcome! Anything else you'd like to know about Jahidul?"
		},
		{
			id: 'no_more',
			patterns: ['no', 'nope', 'nah', 'no thanks', 'nothing else', 'nothing more', 'thats all', 'that is all', 'no more questions', 'not now', 'im good', 'all good', 'not really', 'no more'],
			response: "Alright, thanks for stopping by! Feel free to reach out to Jahidul directly at prithonjahid2480@gmail.com whenever you like."
		},
		{
			id: 'bye',
			patterns: ['bye', 'goodbye', 'see you', 'ok bye', 'cya'],
			response: "Thanks for stopping by! Feel free to reach out to Jahidul directly anytime at prithonjahid2480@gmail.com."
		}
	];

	var FALLBACK_RESPONSE = "I don't have an answer for that yet — I can help with his skills, projects, education, achievements, hobbies, or contact info. You can also email him directly at prithonjahid2480@gmail.com.";

	var QUICK_QUESTIONS = [
		{ label: 'Skills', question: 'What are his skills?' },
		{ label: 'Projects', question: 'Tell me about his projects' },
		{ label: 'Education', question: 'What is his education background?' },
		{ label: 'Contact', question: 'How can I contact him?' }
	];

	// ---------------------------------------------------------------
	// Matching: normalize input, score each KB entry by how many of
	// its patterns appear as whole words/phrases, return the best
	// match. Whole-word boundaries matter — without them a short
	// keyword like "hi" would also match inside unrelated words such
	// as "his" or "him", which used to cause wrong replies.
	// ---------------------------------------------------------------
	function normalize(text) {
		return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
	}

	function escapeRegExp(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	// Precompile a whole-word/whole-phrase regex for each pattern once,
	// up front, instead of re-building it on every keystroke.
	KB.forEach(function (entry) {
		entry.patternRegexes = entry.patterns.map(function (pattern) {
			return new RegExp('\\b' + escapeRegExp(pattern) + '\\b');
		});
	});

	function findResponse(rawInput) {
		var input = normalize(rawInput);
		if (!input) {
			return FALLBACK_RESPONSE;
		}

		var bestScore = 0;
		var bestEntry = null;

		for (var i = 0; i < KB.length; i++) {
			var entry = KB[i];
			var score = 0;

			for (var j = 0; j < entry.patterns.length; j++) {
				if (entry.patternRegexes[j].test(input)) {
					// Longer / multi-word matches count for more.
					score += entry.patterns[j].indexOf(' ') !== -1 ? 3 : 1;
				}
			}

			if (score > bestScore) {
				bestScore = score;
				bestEntry = entry;
			}
		}

		return bestEntry ? bestEntry.response : FALLBACK_RESPONSE;
	}

	// ---------------------------------------------------------------
	// UI wiring
	// ---------------------------------------------------------------
	function escapeHtml(str) {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	// Turn bare emails/URLs in a response into clickable links without
	// touching the rest of the (already-trusted, hard-coded) text.
	function linkify(text) {
		var withEmails = text.replace(
			/([\w.+-]+@[\w-]+\.[\w.-]+)/g,
			'<a href="mailto:$1">$1</a>'
		);
		return withEmails.replace(
			/\b((?:github|linkedin)\.com\/[\w.\-/]+)/gi,
			'<a href="https://$1" target="_blank" rel="noopener">$1</a>'
		);
	}

	function initAiAssistant() {
		var fab = document.getElementById('ai-fab');
		var panel = document.getElementById('ai-panel');
		var closeBtn = document.getElementById('ai-panel-close');
		var body = document.getElementById('ai-panel-body');
		var quickReplies = document.getElementById('ai-quick-replies');
		var form = document.getElementById('ai-form');
		var input = document.getElementById('ai-input');
		var sendBtn = document.getElementById('ai-send');

		if (!fab || !panel || !form || !input || !body) {
			return;
		}

		var isOpen = false;

		function scrollToBottom() {
			body.scrollTop = body.scrollHeight;
		}

		function addMessage(text, sender, isHtml) {
			var msg = document.createElement('div');
			msg.className = 'ai-msg ' + (sender === 'user' ? 'ai-msg-user' : 'ai-msg-bot');
			if (isHtml) {
				msg.innerHTML = linkify(text);
			} else {
				msg.textContent = text;
			}
			body.appendChild(msg);
			scrollToBottom();
		}

		function showTyping() {
			var typing = document.createElement('div');
			typing.className = 'ai-typing';
			typing.id = 'ai-typing-indicator';
			typing.innerHTML = '<span></span><span></span><span></span>';
			body.appendChild(typing);
			scrollToBottom();
		}

		function hideTyping() {
			var typing = document.getElementById('ai-typing-indicator');
			if (typing) {
				typing.remove();
			}
		}

		function respondTo(question) {
			var answer = findResponse(question);
			showTyping();
			sendBtn.disabled = true;

			var delay = 450 + Math.min(question.length * 12, 500);
			window.setTimeout(function () {
				hideTyping();
				addMessage(answer, 'bot', true);
				sendBtn.disabled = false;
			}, delay);
		}

		function handleUserQuestion(question) {
			question = question.trim();
			if (!question) {
				return;
			}
			addMessage(question, 'user', false);
			respondTo(question);
		}

		function buildQuickReplies() {
			quickReplies.innerHTML = '';
			QUICK_QUESTIONS.forEach(function (item) {
				var chip = document.createElement('button');
				chip.type = 'button';
				chip.className = 'ai-chip';
				chip.textContent = item.label;
				chip.addEventListener('click', function () {
					handleUserQuestion(item.question);
				});
				quickReplies.appendChild(chip);
			});
		}

		function openPanel() {
			isOpen = true;
			panel.classList.add('is-open');
			fab.classList.add('is-open');
			fab.classList.remove('ai-pulse');
			fab.setAttribute('aria-expanded', 'true');
			panel.setAttribute('aria-hidden', 'false');
			sessionStorage.setItem('ai-assistant-opened', '1');

			window.setTimeout(function () {
				input.focus();
			}, 200);
		}

		function closePanel() {
			isOpen = false;
			panel.classList.remove('is-open');
			fab.classList.remove('is-open');
			fab.setAttribute('aria-expanded', 'false');
			panel.setAttribute('aria-hidden', 'true');
			fab.focus();
		}

		fab.addEventListener('click', function () {
			if (isOpen) {
				closePanel();
			} else {
				openPanel();
			}
		});

		closeBtn.addEventListener('click', closePanel);

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && isOpen) {
				closePanel();
			}
		});

		// Close when clicking outside the widget.
		document.addEventListener('click', function (event) {
			if (!isOpen) {
				return;
			}
			var target = event.target;
			if (panel.contains(target) || fab.contains(target)) {
				return;
			}
			closePanel();
		});

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			var value = input.value;
			input.value = '';
			handleUserQuestion(value);
		});

		// Enter sends the message; Shift+Enter inserts a newline.
		input.addEventListener('keydown', function (event) {
			if (event.key === 'Enter' && !event.shiftKey) {
				event.preventDefault();
				form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
			}
		});

		buildQuickReplies();

		// Attention pulse for first-time visitors on this tab, until
		// they open the chat once.
		if (!sessionStorage.getItem('ai-assistant-opened')) {
			fab.classList.add('ai-pulse');
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAiAssistant);
	} else {
		initAiAssistant();
	}
})();

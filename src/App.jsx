import React, { useState, useEffect } from 'react';
import './index.css';

// All 33 Training Modules from the RPOA Success Guide
const trainingModules = [
  {
    id: 'auto-quote-flow',
    title: '1. The Flow of an Auto Quote',
    page: 'Page 3',
    desc: 'Master the step-by-step process of presenting auto insurance quotes effectively.',
    content: [
      { title: 'Step 1: Start with the "Fun Stuff"', script: 'Begin with discounts to build excitement: paperless billing, EFT discounts, multi-policy discounts, claim-free discounts, paid-in-full discounts. This creates positive momentum before discussing price.' },
      { title: 'Step 2: Review Coverage Line-by-Line', script: 'Go through each coverage systematically:\n• Liability (Bodily Injury & Property Damage)\n• Uninsured/Underinsured Motorist (UM/UIM)\n• Personal Injury Protection (PIP)\n• Collision Coverage\n• Comprehensive Coverage\n• Rental Reimbursement\n• Towing & Labor' },
      { title: 'Step 3: Explain Each Coverage', script: 'Don\'t just list coverages—explain what they protect. Use real-world scenarios: "If you hit someone, liability pays for their injuries and vehicle. UM/UIM protects YOU if they have no insurance or not enough."' },
      { title: 'Step 4: Present the Price Confidently', script: 'After building value through coverage review, present the price with confidence. Use the 3 Yes Close: "Do you better understand your coverage?" "Do these changes make sense?" "Would you want to move forward?"' },
      { title: 'Key Principle', script: 'NEVER lead with price. Always build value first through discounts and coverage education. Agents who follow this flow close 3x more often than those who just quote a number.' }
    ]
  },
  {
    id: 'home-quote-flow',
    title: '2. The Flow of the Home Quote',
    page: 'Page 13',
    desc: 'Learn the 3-part structure to presenting homeowners insurance.',
    content: [
      { title: 'Part 1: Dwelling Coverage', script: 'Explain that dwelling coverage is about REBUILDING cost, NOT market value. "Market value includes the land, which doesn\'t burn down. We insure the cost to rebuild your home from the ground up."' },
      { title: 'Part 2: Personal Property', script: 'Cover belongings inside the home. Explain actual cash value vs. replacement cost. "Replacement cost means we pay to replace your items new, not what they\'re worth used."' },
      { title: 'Part 3: Liability & Medical Payments', script: 'Home liability protects against lawsuits from injuries on your property. Medical payments covers minor injuries regardless of fault—keeps people from suing you.' },
      { title: 'Additional Coverages', script: 'Loss of Use (pays for hotel/temporary housing if home is uninhabitable), Other Structures (fences, sheds, detached garages), Ordinance or Law (covers code upgrades during rebuild).' },
      { title: 'Key Talking Point', script: '"Most people are underinsured on their home because they insured for market value instead of rebuild cost. Let me make sure you\'re properly protected."' }
    ]
  },
  {
    id: 'renters-insurance',
    title: '3. Why Renters Insurance is So Much More',
    page: 'Page 17',
    desc: 'Position renters insurance as essential protection, not an upsell.',
    content: [
      { title: 'The Misconception', script: '"I don\'t need it—the landlord\'s insurance covers me." WRONG. The landlord\'s policy covers the BUILDING only, not the tenant\'s belongings or liability.' },
      { title: 'What Renters Insurance Covers', script: '• Personal Property (furniture, electronics, clothing, jewelry)\n• Liability (if someone is injured in your rental)\n• Loss of Use (hotel costs if rental becomes uninhabitable)\n• Medical Payments to Others' },
      { title: 'The Value Pitch', script: '"For roughly the cost of a pizza per month ($15-20), you can protect all your belongings and have liability coverage. Your landlord\'s insurance won\'t touch your stuff."' },
      { title: 'Bundle Opportunity', script: 'Use renters insurance as a foot-in-the-door to build the relationship. Once they experience a claim or see the value, they\'re more likely to bundle auto and eventually purchase a home.' },
      { title: 'Closing Script', script: '"Let me add renters insurance to protect your belongings. It\'s only $X/month, and it covers everything you own plus liability. Should I add that to your policy?"' }
    ]
  },
  {
    id: 'umbrella-policies',
    title: '4. How to Sell Umbrella Policies',
    page: 'Page 21',
    desc: 'Position umbrella coverage as essential asset protection.',
    content: [
      { title: 'What is an Umbrella Policy?', script: 'An umbrella policy provides EXTRA liability coverage above and beyond your auto and home policies. It typically starts at $1 million in additional liability protection.' },
      { title: 'The Qualification Approach', script: 'Frame it as a "qualification" conversation: "Based on your assets and income, you actually qualify for an additional layer of protection. Let me explain..."' },
      { title: 'The Asset Conversation', script: '"What would you say your total assets are worth? Your home equity, vehicles, savings, investments, and future earning potential? An umbrella protects ALL of that for roughly $35/month."' },
      { title: 'Real-World Scenarios', script: '• Teen driver causes a serious accident\n• Someone slips on your property and is permanently injured\n• You accidentally cause a multi-car pileup\n• A guest drowns in your pool\nThese can result in million-dollar lawsuits.' },
      { title: 'The Close', script: '"For about $30-40 a month, you get an extra $1-2 million in liability protection that covers both your car AND your home. That\'s less than most people spend on coffee. Should I add that protection for you?"' }
    ]
  },
  {
    id: 'apples-to-apples',
    title: '5. Why Quoting "Apples to Apples" Never Works',
    page: 'Page 24',
    desc: 'Handle the comparison objection and educate on coverage value.',
    content: [
      { title: 'The Prospect Says', script: '"I just want to compare apples to apples with my current policy."' },
      { title: 'The Problem', script: 'Assuming their current coverage is sufficient can be a DISERVICE. Industry options change constantly, and most people haven\'t reviewed their policy since they bought it.' },
      { title: 'The Response', script: '"I completely understand wanting to compare, and I\'m glad you brought that up. The thing is, most people\'s current coverage is based on information that\'s years old. Your needs, assets, and available options have likely changed."' },
      { title: 'The Education Play', script: '"Let me do a quick review of what you currently have, and I\'ll show you exactly how it compares to what\'s available now. That way, you\'re truly comparing apples to apples—with fresh information."' },
      { title: 'Key Principle', script: 'Never dismiss their request. Acknowledge it, then reframe it as an opportunity to ensure they have current, accurate information. This positions you as an advisor, not a salesperson.' }
    ]
  },
  {
    id: 'bundling',
    title: '6. Let\'s Talk Bundling',
    page: 'Page 27',
    desc: 'Master the art of multi-policy selling.',
    content: [
      { title: 'Why Bundling Works', script: 'Bundling creates win-win: the customer gets discounts and simplified billing, while you increase retention and lifetime value. Bundled customers are 3x less likely to leave.' },
      { title: 'The Transitional Phrase', script: '"While I have you on the phone, let me also take a look at your homeowners/renters insurance. There may be a way to save you money on BOTH policies at the same time."' },
      { title: 'The Bundle Presentation', script: '1. Review their auto policy\n2. Transition: "While I have you..."\n3. Pull up their current home/renters policy\n4. Show the bundle discount\n5. Present the TOTAL savings, not individual policy prices' },
      { title: 'The Math Close', script: '"Right now you\'re paying $X for auto and $Y for home separately. If we bundle them together, you\'d pay $Z total. That\'s a savings of $___ per year, and you get one bill, one renewal date, and better coverage."' },
      { title: 'Objection Prevention', script: '"I know you might be happy with your current home/auto carrier, but most people don\'t realize they\'re paying more than they need to. Let me at least show you the numbers—it takes 2 minutes."' }
    ]
  },
  {
    id: 'objection-trifecta',
    title: '7. The Objection Trifecta: Price, Spouse & Email',
    page: 'Page 30',
    desc: 'Handle the three most common objections in any sales call.',
    content: [
      { title: 'Objection 1: "It\'s Too Expensive"', script: 'Cushion: "I completely understand wanting to get the best value."\nClarify: "When you say expensive, are you comparing to what you currently pay, or to another quote you received?"\nReply: Address the root concern with options.' },
      { title: 'Objection 2: "I Need to Talk to My Spouse"', script: 'Cushion: "That makes total sense—this is a family decision."\nClarify: "Would it be easier if I spoke with both of you together, or would you prefer to review it first and we schedule a follow-up?"\nReply: Offer to start the policy now and adjust if needed.' },
      { title: 'Objection 3: "Just Send It in an Email"', script: 'Cushion: "Absolutely, I can send you the details."\nClarify: "I want to make sure the email has everything you need. Would it be okay if we schedule a quick 10-minute follow-up tomorrow to review it together?"\nReply: Set a firm appointment before hanging up.' },
      { title: 'The Common Thread', script: 'All three objections are really about TRUST and VALUE. If you\'ve built enough value through coverage education and demonstrated expertise, these objections become conversations, not roadblocks.' },
      { title: 'GRID Method Reminder', script: 'Cushion → Clarify → Reply → Trial Close. Use this framework for EVERY objection. It keeps you calm and professional.' }
    ]
  },
  {
    id: 'price-objection-basics',
    title: '8. Back to the Basics - The Price Objection',
    page: 'Page 37',
    desc: 'Deep dive into handling price objections effectively.',
    content: [
      { title: 'Why Price Objections Happen', script: 'Price objections occur when VALUE hasn\'t been established. If the prospect only sees a number without understanding coverage, they\'ll compare on price alone.' },
      { title: 'The Reframe', script: '"I hear you. Let me ask you this—when you\'re comparing insurance, are you more concerned about the lowest price, or making sure you\'re actually protected if something happens?"' },
      { title: 'The Options Play', script: 'Always present 2-3 options:\n• Option 1: Matches their current coverage (lowest price)\n• Option 2: Recommended coverage (best value)\n• Option 3: Premium coverage (maximum protection)\nThis shifts the conversation from "yes/no" to "which one."' },
      { title: 'The Insurance Pool Explanation', script: '"Insurance rates are based on a pool we all pay into. Rates rise statewide to ensure the company can afford to pay claims. The question isn\'t which company is cheapest—it\'s which company will actually pay your claim when you need them."' },
      { title: 'The Bottom Line', script: '"The cheapest policy is only cheap until you need to use it. Let me make sure you have the right coverage at a fair price."' }
    ]
  },
  {
    id: 'think-about-it',
    title: '9. "I Need to Think About It"',
    page: 'Page 44',
    desc: 'Handle the classic stall objection with confidence.',
    content: [
      { title: 'What They Really Mean', script: '"I need to think about it" usually means one of three things:\n1. I don\'t fully understand what you presented\n2. I don\'t trust you enough to decide now\n3. I need to talk to someone else (spouse, advisor)' },
      { title: 'The Clarifying Response', script: '"That\'s completely fair. Help me understand—is there something specific you\'d like to think about, or is it more about discussing it with someone?"' },
      { title: 'The Uncover Play', script: 'If they say "I just need to think about it":\n"I get that. Usually when people say that, it\'s because I didn\'t explain something clearly enough. What part can I clarify for you?"' },
      { title: 'The Appointment Close', script: '"Tell you what—let\'s schedule a quick 10-minute call for [specific day/time] after you\'ve had a chance to think it over. That way, I can answer any questions that come up."' },
      { title: 'Key Principle', script: 'Never let "I need to think about it" be the end of the conversation. Always set a specific follow-up appointment before hanging up.' }
    ]
  },
  {
    id: 'just-give-me-price',
    title: '10. "Just Give Me the Price"',
    page: 'Page 46',
    desc: 'Handle prospects who only want the bottom line.',
    content: [
      { title: 'The Two-Option Response', script: '"I can absolutely do that. I can give you the price two ways:\n\nThe FAST way: I assume your current coverage is correct and give you a number in 30 seconds.\n\nThe RIGHT way: I spend 5 minutes making sure all discounts are applied and your coverage is actually correct. Which would you prefer?"' },
      { title: 'Why This Works', script: 'Most people will choose "the right way" because nobody wants to admit their coverage might be wrong. This gives them control while still getting the information you need.' },
      { title: 'If They Insist on Fast', script: 'Give the price, but add: "That\'s based on your current coverage. I\'d strongly recommend a full review because [specific reason: rates have changed, new discounts available, coverage gaps]. When\'s a good time for that?"' },
      { title: 'The Value Reminder', script: '"The price is only one part of the equation. The other part is what you\'re actually getting for that price. Let me make sure you\'re comparing the right things."' },
      { title: 'Key Principle', script: 'Never refuse to give the price. Give it, but frame it in a way that opens the door to a fuller conversation.' }
    ]
  },
  {
    id: 'signed-up-elsewhere',
    title: '11. "I Just Signed Up with Another Company..."',
    page: 'Page 48',
    desc: 'Handle prospects who already switched to a competitor.',
    content: [
      { title: 'The Cushion', script: '"Congratulations on getting that taken care of! I\'m glad you found something that works for you."' },
      { title: 'The Curiosity Play', script: '"If you don\'t mind me asking, what was the biggest factor in your decision? Was it the price, the coverage, or something else?" (Listen carefully—this tells you if they made a good decision)' },
      { title: 'The Review Offer', script: '"I completely respect that. Here\'s what I\'d suggest—let me do a complimentary review of the policy you just signed up for. It costs you nothing, and I can make sure everything is set up correctly. Sometimes in the rush to switch, things get missed."' },
      { title: 'The Future Relationship', script: '"Even if you\'re all set right now, I\'d love to stay in touch. Rates and situations change, and I\'m always here if you need a second opinion. Can I check in with you in 6 months?"' },
      { title: 'Key Principle', script: 'Never bad-mouth the competitor. Be professional, offer value, and plant the seed for a future conversation. Many "lost" prospects come back within 12 months.' }
    ]
  },
  {
    id: 'decided-to-stay',
    title: '12. "I Just Decided to Stay Where I\'m At"',
    page: 'Page 51',
    desc: 'Handle prospects who chose to renew with their current carrier.',
    content: [
      { title: 'The Cushion', script: '"I totally understand. Loyalty to a company you know is a good thing."' },
      { title: 'The Curiosity Question', script: '"What was the biggest factor in your decision to stay? Was it the relationship with your agent, the price, or something else?"' },
      { title: 'The Value Add', script: '"That makes sense. Here\'s what I\'d offer—even though you\'re staying with them, let me do a quick review of your policy. I can often find things that were missed or suggest adjustments that could save you money or improve your protection."' },
      { title: 'The Future Positioning', script: '"I\'m not asking you to change anything today. I just want to make sure you have all the information to make the best decision. When\'s a good time for a 15-minute review?"' },
      { title: 'Key Principle', script: 'Respect their decision but don\'t disappear. Position yourself as a resource, not a competitor. Many people who "stay" will have buyer\'s remorse within 90 days.' }
    ]
  },
  {
    id: 'not-interested',
    title: '13. "I\'m Not Interested..."',
    page: 'Page 53',
    desc: 'Handle the blanket rejection and keep the conversation alive.',
    content: [
      { title: 'The Cushion', script: '"I completely understand. I know I\'m calling you out of the blue, and you\'re busy."' },
      { title: 'The Pattern Interrupt', script: '"Can I ask you a quick question? When was the last time someone actually reviewed your insurance policies to make sure you\'re getting the best deal and the right coverage?"' },
      { title: 'The Value Proposition', script: '"That\'s exactly why I\'m calling. Most people haven\'t had their policies reviewed in years, and the industry has changed a lot. I can do a complimentary review in about 15 minutes, and if I can\'t save you money or improve your coverage, at least you\'ll know you\'re in good shape."' },
      { title: 'The Low-Pressure Close', script: '"I\'m not asking you to buy anything today. I\'m just asking for 15 minutes to show you what\'s available. If it makes sense, great. If not, no hard feelings. When\'s a good time?"' },
      { title: 'Key Principle', script: '"Not interested" is often an automatic response, not a real objection. Acknowledge it, interrupt the pattern, and offer a low-commitment next step.' }
    ]
  },
  {
    id: 'personal-brand',
    title: '14. Setting Up Your Personal Brand',
    page: 'Page 56',
    desc: 'Build trust and credibility from the first interaction.',
    content: [
      { title: 'Why Personal Brand Matters', script: 'People buy from people they trust. Your personal brand is how you establish credibility before you ever quote a price.' },
      { title: 'The Introduction Script', script: '"Hi [Name], this is [Your Name] with Dwyer Insurance Group. I\'m your personal insurance advisor. My job is to make sure you have the right coverage at the right price, and that you actually understand what you\'re paying for."' },
      { title: 'The Rapport Builder', script: 'Start every call with genuine personal connection: "How\'s your day going?" "Did you catch the game last night?" "How\'s the family?" Find common ground before diving into business.' },
      { title: 'The Expertise Display', script: 'Use phrases that demonstrate knowledge: "Based on what I\'m seeing in your area..." "Most people in your situation..." "Here\'s what I typically recommend..." This positions you as an advisor, not an order-taker.' },
      { title: 'The Follow-Through', script: 'Always do what you say you\'ll do. If you promise to send information, send it. If you schedule a follow-up, be there. Your reputation is built one interaction at a time.' }
    ]
  },
  {
    id: 'asset-conversation',
    title: '15. Taking the Uncomfortable Out of the "Asset Conversation"',
    page: 'Page 57',
    desc: 'Have confident conversations about money and assets.',
    content: [
      { title: 'Why It Feels Uncomfortable', script: 'Talking about money feels personal. But as an insurance advisor, you NEED to know their assets to properly protect them. Reframe it as a professional responsibility, not nosiness.' },
      { title: 'The Setup', script: '"In order to make sure you have the right amount of liability coverage, I need to understand what we\'re protecting. Can I ask you a few questions about your assets?"' },
      { title: 'The Asset Categories', script: '• Home equity (what your home is worth minus what you owe)\n• Vehicles (cars, boats, RVs, motorcycles)\n• Savings and investments\n• Future earning potential (especially for young professionals)\n• Other real estate or business interests' },
      { title: 'The Natural Transition', script: '"Based on what you\'ve told me, your total assets are roughly $X. Your current liability coverage is $Y. If you were sued, that gap could come out of your pocket. Let\'s make sure you\'re protected."' },
      { title: 'Key Principle', script: 'The asset conversation isn\'t about being nosy—it\'s about being thorough. Frame it as professional due diligence, and most prospects will be happy to share.' }
    ]
  },
  {
    id: 'cancel-policies',
    title: '16. "I Was Just Calling to Cancel My Policies"',
    page: 'Page 59',
    desc: 'Handle cancellation requests with grace and retention strategies.',
    content: [
      { title: 'The Cushion', script: '"I appreciate you calling to let me know. Before we process that, can I ask what\'s driving the decision?"' },
      { title: 'The Listen & Learn', script: 'Listen carefully to their reason. Is it price? Service? Found something better? Understanding the "why" tells you if there\'s a path to retention.' },
      { title: 'The Value Reminder', script: '"I completely understand. Before we finalize this, let me highlight a few things you may be leaving behind: [mention unique benefits, claim history, loyalty discounts, coverage features they may not know about]."' },
      { title: 'The Review Offer', script: '"Tell you what—let me do a quick review of your current policy and what you\'re switching to. If the other option is truly better, I\'ll help you transition. But if there\'s something you\'re missing, I\'d be doing you a disservice by not mentioning it."' },
      { title: 'The Graceful Exit', script: 'If they insist: "I respect your decision. Let me process this for you. If things change or you have any issues with the new carrier, my door is always open. Thank you for your business."' }
    ]
  },
  {
    id: 'rates-went-up',
    title: '17. "Why Did My Rates Go Up?"',
    page: 'Page 62',
    desc: 'Explain rate increases and maintain customer trust.',
    content: [
      { title: 'The Empathy First', script: '"I completely understand your concern. Nobody likes seeing their rates increase. Let me look into this and explain exactly what happened."' },
      { title: 'The Insurance Pool Explanation', script: '"Insurance is essentially a pool we all pay into. When claims increase in your area or statewide, the pool needs more money to ensure the company can afford to pay everyone\'s claims. This affects all carriers, not just us."' },
      { title: 'The Specific Factors', script: 'Explain specific factors that may have impacted their rate:\n• Claims in their zip code\n• Changes in their driving record\n• Changes to their coverage\n• Statewide rate adjustments\n• Changes in their credit-based insurance score' },
      { title: 'The Options Play', script: '"Here\'s what I can do: Let me review your policy and see if there are any adjustments we can make to bring the price down. There may be discounts you\'re not taking advantage of, or coverage adjustments that make sense."' },
      { title: 'The Reframe', script: '"I know the rate went up, but I want to make sure you\'re still getting good value. Let me show you what you\'re getting for that price, and we\'ll compare it to what\'s available elsewhere."' }
    ]
  },
  {
    id: 'monoline-calls',
    title: '18. Making Monoline Calls That Get Results',
    page: 'Page 65',
    desc: 'Turn single-policy calls into multi-policy opportunities.',
    content: [
      { title: 'What is a Monoline Call?', script: 'A monoline call is when a customer calls about ONE policy (usually auto). This is a GOLDEN opportunity to review their OTHER insurance needs.' },
      { title: 'The Transitional Phrase', script: '"While I have you on the phone, let me also take a look at your homeowners/renters insurance. There may be a way to save you money on both policies at the same time."' },
      { title: 'The Value Add', script: '"Most people don\'t realize that bundling auto and home can save them 15-25% on BOTH policies. Let me pull up your home policy real quick and see what\'s possible."' },
      { title: 'The Review Approach', script: '1. Handle their original request first (build goodwill)\n2. Transition to the other policy\n3. Review their current coverage\n4. Show the bundle savings\n5. Present the total picture' },
      { title: 'Key Principle', script: 'Every monoline call is a cross-sell opportunity. But handle their original need FIRST—then transition naturally. Never make them feel like you\'re pushing.' }
    ]
  },
  {
    id: 'three-yes-close',
    title: '19. The 3 Yes Close',
    page: 'Page 69',
    desc: 'Master the simplest closing technique in insurance sales.',
    content: [
      { title: 'The Three Questions', script: 'After presenting the quote and reviewing coverage, ask:\n\n1. "Do you better understand how your insurance works now?"\n2. "Do the changes we talked about make sense?"\n3. "Would you want to work with me now and in the future?"' },
      { title: 'Why It Works', script: 'Each question is designed to get a "yes." Three consecutive "yes" answers create psychological momentum toward closing the sale.' },
      { title: 'The Delivery', script: 'Ask each question naturally, one at a time. Wait for their answer. If they say "yes" to all three, you\'ve closed the deal. If they hesitate on any one, address that specific concern.' },
      { title: 'Handling a "No"', script: 'If they say "no" or hesitate: "Help me understand what part doesn\'t make sense yet." This isolates the real objection so you can address it directly.' },
      { title: 'Key Principle', script: 'The 3 Yes Close works because it\'s not pushy—it\'s confirmatory. You\'re not asking them to buy; you\'re asking if they understand and agree. The close is the natural result.' }
    ]
  },
  {
    id: 'closing-the-sale',
    title: '20. Closing the Sale',
    page: 'Page 70',
    desc: 'The art of confidently finalizing the insurance sale.',
    content: [
      { title: 'The Pre-Close', script: 'Before you present price, you should already know they\'re going to buy. This comes from building value through coverage education, rapport, and the 3 Yes Close.' },
      { title: 'The Assumptive Close', script: '"Great, let me get this policy set up for you. I\'ll need your payment information and we can get your coverage effective as of [date]."' },
      { title: 'The Option Close', script: '"Based on what we discussed, I recommend Option 2. Would you like to go with that, or would you prefer the higher coverage of Option 3?"' },
      { title: 'The Urgency Close', script: '"The quote is valid through [date], and rates are currently trending [up/down]. I\'d recommend locking this in now while the rate is available."' },
      { title: 'Key Principle', script: 'Closing isn\'t about pressure—it\'s about confidence. If you\'ve done the work upfront (built value, addressed objections, established trust), the close is simply the next logical step.' }
    ]
  },
  {
    id: 'presenting-price',
    title: '21. The Do\'s and Don\'ts of Presenting Price',
    page: 'Page 72',
    desc: 'Present price in a way that closes deals instead of killing them.',
    content: [
      { title: 'DO: Build Value First', script: 'Always review coverage and discounts BEFORE presenting price. The number means nothing without context. Value first, price second.' },
      { title: 'DO: Present with Confidence', script: 'Say the price clearly and confidently. Don\'t apologize, don\'t mumble, don\'t rush through it. "Your total premium is $X per month, which includes [list key coverages]."' },
      { title: 'DON\'T: Lead with Price', script: 'Never open with the price. If the first thing they hear is a number, that\'s all they\'ll focus on. Build the value first.' },
      { title: 'DO: Present Options', script: 'Give 2-3 options at different price points. This shifts the decision from "should I buy?" to "which option should I choose?"' },
      { title: 'DON\'T: Apologize for Price', script: 'Never say "I know it\'s higher than what you\'re paying" or "I wish it was lower." Present the price as fair and justified by the coverage.' },
      { title: 'DO: Pause After Presenting', script: 'After you say the price, STOP TALKING. Let them process it. The next person to speak loses leverage. Be comfortable with silence.' }
    ]
  },
  {
    id: 'too-expensive',
    title: '22. "No Thanks, You\'re Just Too Expensive."',
    page: 'Page 76',
    desc: 'Handle the direct price rejection with skill.',
    content: [
      { title: 'The Cushion', script: '"I completely understand. Everyone wants to get the best value for their money."' },
      { title: 'The Clarify Question', script: '"When you say expensive, are you comparing to what you currently pay, or to another quote you\'ve received?" (This tells you what you\'re really up against)' },
      { title: 'The Value Reframe', script: '"I hear you. Let me ask you this—if I could show you that the slightly higher price actually gives you significantly more protection, would that be worth a few minutes of your time?"' },
      { title: 'The Options Play', script: '"Let me show you a couple of different options. I can adjust some coverages to get closer to your budget, but I want to make sure we don\'t create gaps in your protection."' },
      { title: 'The Bottom Line', script: '"The most expensive policy is the one that doesn\'t pay your claim when you need it. Let me make sure we\'re comparing the right things before we make a decision based on price alone."' }
    ]
  },
  {
    id: 'the-grid',
    title: '23. The GRID Method',
    page: 'Page 77',
    desc: 'A systematic approach to handling any objection.',
    content: [
      { title: 'G - Cushion (Acknowledge)', script: '"I completely understand how you feel." / "That\'s a great question." / "I\'m glad you brought that up." This disarms the objection and shows empathy.' },
      { title: 'R - Clarify (Understand)', script: '"Help me understand..." / "Can you tell me more about..." / "What specifically concerns you about..." This isolates the real objection.' },
      { title: 'I - Reply (Provide Solution)', script: 'Address their specific concern with facts, examples, or options. Don\'t give a generic response—tailor your reply to what they just told you.' },
      { title: 'D - Trial Close (Confirm)', script: '"Does that address your concern?" / "Does that sound like a good solution?" / "Does that make sense?" This confirms you\'ve resolved the objection.' },
      { title: 'Why GRID Works', script: 'It gives you a framework so you never freeze when an objection comes. Cushion → Clarify → Reply → Trial Close. Practice this until it becomes second nature.' }
    ]
  },
  {
    id: 'setting-appointments',
    title: '24. Setting Appointments That Hold',
    page: 'Page 78',
    desc: 'Schedule follow-ups that prospects actually show up for.',
    content: [
      { title: 'The Specific Time Close', script: 'Never say "When\'s a good time?" Instead: "Does Tuesday at 2 PM work, or would Wednesday at 10 AM be better?" Specific times hold better than open-ended requests.' },
      { title: 'The Reason Why', script: 'Give them a reason to hold the appointment: "I\'ll have your personalized quote ready to review" or "I\'m going to pull together some options specifically for your situation."' },
      { title: 'The Confirmation', script: '"Great, I have you down for [Day] at [Time]. I\'ll send you a quick text/email reminder the day before. Does that work?"' },
      { title: 'The Commitment Builder', script: '"In the meantime, if you have any questions at all, don\'t hesitate to reach out. I\'ll be here for our appointment on [Day]."' },
      { title: 'Key Principle', script: 'Appointments hold when the prospect sees VALUE in showing up. Give them a reason, be specific about the time, and confirm before hanging up.' }
    ]
  },
  {
    id: 'outbound-checklist',
    title: '25. The Outbound Call Checklist',
    page: 'Page 81',
    desc: 'A systematic approach to every outbound call.',
    content: [
      { title: '1. Rapport (Personal Brand)', script: 'Introduce yourself, build connection, establish credibility. "Hi [Name], this is [Your Name] with Dwyer Insurance Group..."' },
      { title: '2. Discounts', script: 'Start with the "fun stuff"—all available discounts. Build excitement before discussing coverage or price.' },
      { title: '3. Assets', script: 'Have the asset conversation. Understand what needs to be protected: home equity, vehicles, savings, investments, future earning potential.' },
      { title: '4. Coverage (RDCR)', script: 'Review all coverages: Responsibility (Liability), Damage (Collision/Comp), Coverage (UM/UIM, PIP), Rental/Towing. Explain each one.' },
      { title: '5. Recap', script: 'Summarize what you\'ve discussed: "So here\'s what we\'ve covered..." Reinforce the value before presenting price.' },
      { title: '6. 3 Yes Close', script: '"Do you better understand your coverage?" "Do these changes make sense?" "Would you want to work with me?"' },
      { title: '7. Close, Life, and Recommendation', script: 'Finalize the policy, ask about life insurance, and make a recommendation for their next step (umbrella, bundling, etc.)' }
    ]
  },
  {
    id: 'inbound-checklist',
    title: '26. The Inbound Call Checklist',
    page: 'Page 82',
    desc: 'Handle inbound calls professionally and productively.',
    content: [
      { title: '1. Greeting', script: '"Thank you for calling Dwyer Insurance Group, this is [Your Name]. How can I help you today?" Be warm, professional, and ready to serve.' },
      { title: '2. Affirmation', script: 'Acknowledge their reason for calling: "I can absolutely help you with that" or "Great question, let me look into that for you."' },
      { title: '3. Scan Policies', script: 'Pull up their policy/ies and review their current coverage. Look for gaps, opportunities, or things to point out positively.' },
      { title: '4. Point Out Something Positive', script: '"I\'m looking at your policy and I see you have [good coverage/discount/benefit]. That\'s great." Build value before addressing their request.' },
      { title: '5. Help with Request', script: 'Address their original need thoroughly and professionally.' },
      { title: '6. Transition to Full Review', script: '"While I have you, let me also take a look at your other policies. There may be ways to save you money or improve your coverage."' }
    ]
  },
  {
    id: 'life-insurance-process',
    title: '27. The Process of Asking for Life Insurance',
    page: 'Page 83',
    desc: 'Introduce life insurance naturally into the conversation.',
    content: [
      { title: 'Step 1: The Question', script: '"Where do you have your life insurance outside of work?" (Most people either don\'t have it or haven\'t reviewed it recently)' },
      { title: 'Step 2: The Follow-Up', script: '"When was the last time you had that reviewed?" (If they have it through work, it\'s likely outdated and insufficient)' },
      { title: 'Step 3: The Setup', script: '"That\'s exactly why I asked. Most people\'s life insurance through work isn\'t enough to truly protect their family. Let me do a quick review and make sure you have the right amount of coverage."' },
      { title: 'The Need Summary', script: 'Calculate their actual need: mortgage balance, income replacement, children\'s education, final expenses. Present the gap between what they have and what they need.' },
      { title: 'The Appointment Set', script: '"Life insurance is a little more involved than auto or home, so I\'d like to schedule a dedicated appointment to go over this properly. Does [specific day/time] work?"' }
    ]
  },
  {
    id: 'asking-referrals',
    title: '28. Asking for Referrals',
    page: 'Page 84',
    desc: 'Get quality referrals without being pushy or awkward.',
    content: [
      { title: 'The Setup', script: '"I\'m really glad we could help you today. I want to ask you something—would you be open to helping me grow my business?"' },
      { title: 'The Ask', script: '"If I could hand-select my customers, I would build my business with people just like you. Who do you know that is just like you that I could help?"' },
      { title: 'The Specific Request', script: 'Don\'t accept "I\'ll think about it." Ask specifically: "Who comes to mind? A coworker? A neighbor? A family member?"' },
      { title: 'The Introduction Request', script: '"Would you be comfortable introducing me via email or text? Or would you prefer I reach out to them directly and mention you sent me?"' },
      { title: 'Key Principle', script: 'The best time to ask for a referral is RIGHT AFTER you\'ve helped them with something (a claim, a policy review, a savings opportunity). Strike while the iron is hot.' }
    ]
  },
  {
    id: 'auto-quote-deep-dive',
    title: '29. Auto Quote Deep Dive - Coverage Details',
    page: 'Advanced',
    desc: 'Master every line of an auto insurance policy.',
    content: [
      { title: 'Liability Coverage', script: 'Bodily Injury: Pays for injuries you cause to others. Recommend $250K/$500K minimum.\nProperty Damage: Pays for damage to other vehicles/property. Recommend $100K minimum.' },
      { title: 'Uninsured/Underinsured Motorist', script: 'Protects YOU when the at-fault driver has no insurance or insufficient coverage. Should match your liability limits. "Don\'t let someone else\'s bad decisions bankrupt you."' },
      { title: 'Personal Injury Protection (PIP)', script: 'Covers medical expenses, lost wages, and rehabilitation for you and your passengers regardless of fault. Required in some states, optional in others.' },
      { title: 'Collision & Comprehensive', script: 'Collision: Pays for damage to YOUR car from an accident.\nComprehensive: Pays for non-collision damage (theft, vandalism, weather, animals).\nRecommend actual cash value or replacement cost.' },
      { title: 'Rental & Towing', script: 'Rental Reimbursement: Pays for a rental car while yours is being repaired after a covered claim.\nTowing & Labor: Covers towing, lockout service, tire changes. Usually $5-10/month.' }
    ]
  },
  {
    id: 'home-quote-deep-dive',
    title: '30. Home Quote Deep Dive - Coverage Details',
    page: 'Advanced',
    desc: 'Master every line of a homeowners insurance policy.',
    content: [
      { title: 'Dwelling Coverage (Coverage A)', script: 'Covers the structure of your home. Must be based on REBUILD cost, not market value. Use a replacement cost estimator. Include code upgrade coverage (Ordinance or Law).' },
      { title: 'Other Structures (Coverage B)', script: 'Covers detached structures: fences, sheds, detached garages, gazebos. Typically 10% of dwelling coverage.' },
      { title: 'Personal Property (Coverage C)', script: 'Covers belongings inside the home. Replacement Cost vs. Actual Cash Value. Special limits on jewelry, art, collectibles—schedule high-value items separately.' },
      { title: 'Loss of Use (Coverage D)', script: 'Pays for temporary housing if your home is uninhabitable after a covered loss. Hotel, meals, storage. Typically 20-30% of dwelling coverage.' },
      { title: 'Liability & Medical Payments', script: 'Personal Liability: Protects against lawsuits from injuries or property damage.\nMedical Payments: Covers minor injuries on your property regardless of fault. Keeps people from suing.' }
    ]
  },
  {
    id: 'advanced-bundling',
    title: '31. Advanced Bundling Strategies',
    page: 'Advanced',
    desc: 'Take bundling to the next level with multi-line mastery.',
    content: [
      { title: 'The Full Portfolio Review', script: 'Review ALL policies at once: auto, home, renters, umbrella, life, specialty items (boats, RVs, motorcycles). Show the TOTAL picture of their insurance.' },
      { title: 'The Bundle Math', script: '"Separately, you\'re paying $X for auto and $Y for home. Bundled, you\'d pay $Z for both. That\'s $___ in annual savings, plus one bill, one renewal date, and better coverage."' },
      { title: 'The Retention Play', script: '"Customers with 2+ policies are 3x less likely to leave their carrier. By bundling, you\'re not just saving money—you\'re simplifying your life and getting better service."' },
      { title: 'The Cross-Sell Ladder', script: 'Start with auto → add home/renters → add umbrella → add life → add specialty items. Each step builds on the previous relationship.' },
      { title: 'Key Principle', script: 'Bundling isn\'t about selling more—it\'s about serving better. Bundled customers get better coverage, better rates, and better service. Frame it that way.' }
    ]
  },
  {
    id: 'objection-mastery',
    title: '32. Objection Mastery - Advanced Scenarios',
    page: 'Advanced',
    desc: 'Handle complex objections with confidence and grace.',
    content: [
      { title: '"I\'m Happy with My Current Agent"', script: '"That\'s great to hear—having a good agent relationship is important. I\'m not asking you to change anything. I\'m just offering a second opinion. When\'s a good time for a quick review?"' },
      { title: '"I Don\'t Have Time Right Now"', script: '"I completely respect your time. That\'s exactly why I\'m calling—to make sure your insurance is working efficiently for you. A 15-minute review could save you hours of headaches down the road."' },
      { title: '"I\'ve Had Bad Experiences with Insurance"', script: '"I\'m sorry to hear that. Unfortunately, not all agents provide the level of service they should. That\'s exactly why I\'m here—to make sure you have a better experience. Can we start fresh?"' },
      { title: '"Send Me Information and I\'ll Review It"', script: '"Absolutely, I can send information. But insurance is complex, and I want to make sure you understand what you\'re looking at. Let\'s schedule a quick follow-up after you\'ve reviewed it."' },
      { title: 'Key Principle', script: 'Every objection is a request for more information or more trust. Use the GRID method: Cushion, Clarify, Reply, Trial Close. Stay calm, stay professional, stay helpful.' }
    ]
  },
  {
    id: 'daily-success-habits',
    title: '33. Daily Success Habits for Insurance Agents',
    page: 'Advanced',
    desc: 'Build the habits that separate top producers from the rest.',
    content: [
      { title: 'Daily Activity Goals', script: '• Policy Reviews: 5 per day\n• Items Sold: 3 per day\n• Quoted Households: Track daily\n• Call Volume: 45+ calls per day\n• Talk Time: 120+ minutes per day' },
      { title: 'Self-Generation Goals', script: '• Self-Generated Quoted HHs: 10 before promotion\n• Google Reviews: 5 before promotion\n• Referral Requests: Ask every satisfied customer\n• Follow-Up: Every appointment, every time' },
      { title: 'The Daily Routine', script: '1. Morning: Review your pipeline, set daily goals\n2. Mid-Morning: Outbound calls (highest energy)\n3. Afternoon: Appointments, follow-ups, service calls\n4. End of Day: Update CRM, schedule next day\'s appointments' },
      { title: 'Continuous Learning', script: '• Review training modules regularly\n• Role-play objection handling with teammates\n• Study product updates and industry changes\n• Track your metrics and look for improvement areas' },
      { title: 'The Success Mindset', script: '"Every call is an opportunity to help someone. Every review is a chance to save them money or protect them better. Every objection is a chance to demonstrate your expertise. Approach each day with that mindset, and success follows."' }
    ]
  }
];

// Mock Data
const initialAgents = [
  {
    id: 1,
    name: 'Daniela',
    username: 'daniela',
    password: 'password',
    metrics: { policyReviews: 4, quotedHHs: 8, itemsSold: 2, emailsResolved: 15, callVolume: 45, talkTime: 120, selfGeneratedQuotedHHs: 3, googleReviews: 1 },
    training: {}, // Will be initialized below
    currentPage: 'Page 24: Apples to Apples'
  },
  {
    id: 2,
    name: 'Michael',
    username: 'michael',
    password: 'password',
    metrics: { policyReviews: 2, quotedHHs: 5, itemsSold: 0, emailsResolved: 8, callVolume: 30, talkTime: 95, selfGeneratedQuotedHHs: 1, googleReviews: 0 },
    training: {}, // Will be initialized below
    currentPage: 'Page 10: Auto Quote Flow'
  }
];

// Initialize training status for all modules
initialAgents.forEach(agent => {
  trainingModules.forEach((mod, index) => {
    if (index < 2) {
      agent.training[mod.id] = 'Completed';
    } else if (index === 2) {
      agent.training[mod.id] = 'In Progress';
    } else {
      agent.training[mod.id] = 'Not Started';
    }
  });
});

export default function App() {
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState(initialAgents);
  const [successDayConfig, setSuccessDayConfig] = useState({ show: false, agentName: '' });

  const checkSuccessDay = (agent) => {
    return agent.metrics.policyReviews >= 5 || agent.metrics.itemsSold >= 3;
  };

  useEffect(() => {
    if (user?.role === 'agent') {
      const isSuccess = checkSuccessDay(agents.find(a => a.id === user.id));
      if (isSuccess && !successDayConfig.show) {
        setSuccessDayConfig({ show: true, agentName: user.name });
        setTimeout(() => setSuccessDayConfig({ show: false, agentName: '' }), 6000);
      }
    }
  }, [user, agents]);

  const updateAgentTraining = (id, moduleId, status) => {
    setAgents(agents.map(a => {
      if (a.id === id) {
        return { ...a, training: { ...a.training, [moduleId]: status } };
      }
      return a;
    }));
  };

  if (!user) {
    return (
      <>
        <div className="particle" style={{ width: '12px', height: '12px', top: '20%', left: '15%' }}></div>
        <div className="particle" style={{ width: '8px', height: '8px', top: '15%', left: '80%', animationDelay: '2s' }}></div>
        <div className="particle" style={{ width: '15px', height: '15px', top: '60%', left: '10%', animationDelay: '1s' }}></div>
        <div className="particle" style={{ width: '10px', height: '10px', top: '70%', left: '85%', animationDelay: '3s' }}></div>
        <LandingPage onLogin={setUser} agents={agents} />
      </>
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar" style={{ padding: '1rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
        <div className="navbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          <span>Dwyer</span> <span style={{ color: 'var(--dark-text)', fontWeight: 600 }}>Insurance Group</span>
        </div>
        <div>
          <span style={{ marginRight: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Welcome, {user.name || 'Admin'}</span>
          <button className="btn btn-outline" onClick={() => setUser(null)}>Logout</button>
        </div>
      </nav>

      {user.role === 'admin' ? (
        <AdminDashboard agents={agents} setAgents={setAgents} checkSuccessDay={checkSuccessDay} updateAgentTraining={updateAgentTraining} />
      ) : (
        <AgentDashboard agent={agents.find(a => a.id === user.id)} updateAgentTraining={updateAgentTraining} />
      )}

      {successDayConfig.show && (
        <>
          <div className="overlay" onClick={() => setSuccessDayConfig({ show: false, agentName: '' })}></div>
          <div className="success-popup" style={{ border: '6px solid var(--accent-green)' }}>
            <div className="confetti" style={{ fontSize: '5rem' }}>🎉🏆🎉</div>
            <h2 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>SUCCESS DAY!</h2>
            <p style={{ fontSize: '1.4rem', color: '#1e293b' }}>Congratulations <strong>{successDayConfig.agentName}</strong>!</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>You've hit your daily targets.</p>
            <button className="btn btn-success" style={{ marginTop: '2rem', fontSize: '1.2rem' }} onClick={() => setSuccessDayConfig({ show: false, agentName: '' })}>Keep Going!</button>
          </div>
        </>
      )}
    </div>
  );
}

function LandingPage({ onLogin, agents }) {
  const [showLogin, setShowLogin] = useState(false);
  const [tab, setTab] = useState('agent');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'admin') {
      if (username.toLowerCase() === 'admin' && password === 'admin') {
        onLogin({ role: 'admin' });
      } else {
        setError('Invalid Admin credentials.');
      }
    } else {
      const agent = agents.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);
      if (agent) {
        onLogin({ role: 'agent', id: agent.id, name: agent.name });
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  return (
    <>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            <span>Dwyer</span> <span style={{ color: 'var(--dark-text)' }}>Insurance Group</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn" onClick={() => setShowLogin(true)}>Access Dashboard &rarr;</button>
          </div>
        </nav>

        <div className="landing-page">
          <div className="pill-badge">Built for Insurance Sales Teams</div>
          <h1>The Training Command Center</h1>
          <h1 className="gradient-text" style={{ fontSize: '4.5rem' }}>for Insurance Teams</h1>
          <p>
            Stop guessing. Start winning. Track your onboarding journey through 33 comprehensive training modules, daily quotas, quoted households,
            and bind in real time — with live scorecards and accountability playbooks.
          </p>
          <button className="btn" style={{ fontSize: '1.15rem', padding: '1rem 2rem' }} onClick={() => setShowLogin(true)}>
            Access Dashboard &rarr;
          </button>
          <div className="landing-cards">
            <div className="landing-card">
              <h4>33 Modules</h4>
              <p>Complete Training Library</p>
            </div>
            <div className="landing-card">
              <h4>0% → 100%</h4>
              <p>Progressive Tracking</p>
            </div>
            <div className="landing-card">
              <h4>Real-Time</h4>
              <p>Dashboard Updates</p>
            </div>
            <div className="landing-card">
              <h4>All Roles</h4>
              <p>Sales, Service & More</p>
            </div>
          </div>
        </div>
      </div>

      {showLogin && (
        <div className="login-modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-container" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: 'var(--dark-text)', marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h2>
            <div className="login-tabs">
              <div className={`login-tab ${tab === 'agent' ? 'active' : ''}`} onClick={() => { setTab('agent'); setError(''); }}>Agent</div>
              <div className={`login-tab ${tab === 'admin' ? 'active' : ''}`} onClick={() => { setTab('admin'); setError(''); }}>Admin</div>
            </div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Username</label>
                <input type="text" required className="input-field" value={username} onChange={e => setUsername(e.target.value)} placeholder={tab === 'admin' ? 'admin' : 'daniela'} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
              </div>
              {error && <div style={{ color: 'var(--danger-red)', marginBottom: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>{error}</div>}
              <button type="submit" className="btn" style={{ width: '100%', padding: '0.9rem', justifyContent: 'center' }}>Enter Portal</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function AgentDashboard({ agent, updateAgentTraining }) {
  const [expandedStep, setExpandedStep] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { title: "Core Workflows", start: 0, end: 6 },
    { title: "Objection Handling", start: 6, end: 13 },
    { title: "Sales Process", start: 13, end: 28 },
    { title: "Advanced Topics", start: 28, end: 33 }
  ];

  const getStatusClass = (status) => {
    if (status === 'Completed') return 'completed';
    if (status === 'In Progress') return 'in-progress';
    return 'not-started';
  };

  // Calculate overall training progress
  const totalModules = trainingModules.length;
  const completedModules = trainingModules.filter(mod => agent.training[mod.id] === 'Completed').length;
  const inProgressModules = trainingModules.filter(mod => agent.training[mod.id] === 'In Progress').length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);

  const currentCategory = categories[activeCategory];
  const activeModules = trainingModules.slice(currentCategory.start, currentCategory.end);

  return (
    <div>
      {/* OVERALL TRAINING PROGRESS CARD */}
      <div className="overall-progress-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Your Training Progress</h2>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '1.1rem' }}>
              {completedModules} of {totalModules} Modules Completed • {inProgressModules} In Progress
            </p>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 900, marginLeft: '2rem' }}>
            {progressPercent}%
          </div>
        </div>

        {/* Active Modules Visual Display */}
        {inProgressModules > 0 && (
          <div style={{ marginTop: '1.5rem', width: '100%', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', opacity: 0.9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Currently Working On:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {trainingModules.filter(mod => agent.training[mod.id] === 'In Progress').map(mod => (
                <div key={mod.id} style={{
                  background: '#f59e0b',
                  color: 'white',
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)'
                }}>
                  <span style={{ fontSize: '1rem' }}>▶</span> {mod.title.replace(/^\d+\.\s*/, '')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="panel" style={{ paddingBottom: '3rem' }}>
        <h2 style={{ color: 'var(--dark-text)', margin: '0 0 0.5rem 0', fontSize: '1.6rem' }}>RPOA Success Guide - Complete Training Map</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Follow the path to finalize your core competencies. Each module builds on the last—complete them in order for maximum impact.</p>

        <div className="category-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', borderBottom: '2px solid var(--border-color)' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="btn"
              style={{
                borderRadius: '8px 8px 0 0',
                padding: '0.75rem 1.5rem',
                borderBottom: activeCategory === idx ? 'none' : '1px solid var(--border-color)',
                marginBottom: '-2px',
                background: activeCategory === idx ? 'var(--primary-blue)' : 'var(--bg-blue)',
                color: activeCategory === idx ? 'white' : 'var(--primary-blue)',
                fontWeight: activeCategory === idx ? 700 : 500,
                transition: 'all 0.2s',
                boxShadow: 'none'
              }}
              onClick={() => setActiveCategory(idx)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="training-map">
          {activeModules.map((mod) => {
            const index = trainingModules.findIndex(m => m.id === mod.id);
            const status = agent.training[mod.id];
            const statusClass = getStatusClass(status);
            const isExpanded = expandedStep === mod.id;

            return (
              <div key={mod.id} className={`map-node ${statusClass}`} onClick={() => setExpandedStep(isExpanded ? null : mod.id)}>
                <div className="map-node-number">{index + 1}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: 'var(--dark-text)', fontSize: '1.15rem' }}>{mod.title}</h3>
                  <span className={`badge badge-${statusClass}`}>{status}</span>
                </div>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{mod.desc}</p>
                {mod.page && <p style={{ margin: '0.25rem 0 0 0', color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>{mod.page}</p>}

                {isExpanded && (
                  <div className="training-content" onClick={e => e.stopPropagation()}>
                    {mod.content.map((item, idx) => (
                      <div key={idx} className="training-item">
                        <h4>{item.title}</h4>
                        <p>{item.script}</p>
                      </div>
                    ))}

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--dark-text)' }}>Mark your status:</span>
                      <select
                        className="input-field"
                        style={{ width: '250px', marginBottom: 0 }}
                        value={status}
                        onChange={(e) => updateAgentTraining(agent.id, mod.id, e.target.value)}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ agents, setAgents, checkSuccessDay, updateAgentTraining }) {
  const [editingAgent, setEditingAgent] = useState(null);

  const updateAgentMetric = (id, field, value) => {
    setAgents(agents.map(a => {
      if (a.id === id) {
        return { ...a, metrics: { ...a.metrics, [field]: Number(value) } };
      }
      return a;
    }));
  };

  return (
    <div>
      <div className="panel">
        <div className="panel-header">Admin Control Panel</div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Credentials</th>
                <th>Success Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(a => {
                const success = checkSuccessDay(a);
                return (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '1.1rem' }}>{a.name}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <strong>User:</strong> {a.username} <br /> <strong>Pass:</strong> {a.password}
                    </td>
                    <td>
                      {success ? (
                        <span className="badge badge-completed">Yes - Reached</span>
                      ) : (
                        <span className="badge badge-not-started">No</span>
                      )}
                    </td>
                    <td>
                      <button className={`btn btn-outline ${editingAgent === a.id ? 'btn-success' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => setEditingAgent(editingAgent === a.id ? null : a.id)}>
                        {editingAgent === a.id ? 'Close Panel' : 'Manage Agent'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {editingAgent && (
          <div style={{ marginTop: '2rem', padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--border-color)', animation: 'slideIn 0.3s ease-out' }}>
            <h3 style={{ color: 'var(--dark-text)', marginTop: 0, marginBottom: '2rem', fontSize: '1.4rem' }}>
              Managing Profile: {agents.find(a => a.id === editingAgent).name}
            </h3>
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '320px' }}>
                <h4 style={{ marginBottom: '1.5rem', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Performance Overrides</h4>

                <div className="metrics-input-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 600 }}>Policy Reviews (Goal 5):</label>
                  <input type="number" className="input-field" style={{ width: '120px', marginBottom: 0 }} value={agents.find(a => a.id === editingAgent).metrics.policyReviews} onChange={e => updateAgentMetric(editingAgent, 'policyReviews', e.target.value)} />
                </div>

                <div className="metrics-input-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 600 }}>Items Sold (Goal 3):</label>
                  <input type="number" className="input-field" style={{ width: '120px', marginBottom: 0 }} value={agents.find(a => a.id === editingAgent).metrics.itemsSold} onChange={e => updateAgentMetric(editingAgent, 'itemsSold', e.target.value)} />
                </div>

                <div className="metrics-input-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 600 }}>Talk Time (minutes):</label>
                  <input type="number" className="input-field" style={{ width: '120px', marginBottom: 0 }} value={agents.find(a => a.id === editingAgent).metrics.talkTime} onChange={e => updateAgentMetric(editingAgent, 'talkTime', e.target.value)} />
                </div>
              </div>

              <div style={{ flex: 2, minWidth: '400px' }}>
                <h4 style={{ marginBottom: '1.5rem', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Training Map Force Progress</h4>

                <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {trainingModules.map(mod => (
                    <div key={mod.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem', height: '35px', overflow: 'hidden' }}>{mod.title}</label>
                      <select className="input-field" style={{ width: '100%', marginBottom: 0, padding: '0.5rem' }} value={agents.find(a => a.id === editingAgent).training[mod.id]} onChange={e => updateAgentTraining(editingAgent, mod.id, e.target.value)}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

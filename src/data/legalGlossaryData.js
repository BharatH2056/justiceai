export const GLOSSARY_TERMS = [
  // --- CRIMINAL (IPC -> BNS & CrPC -> BNSS) ---
  {
    id: 1,
    term: 'Murder',
    category: 'criminal',
    definition:
      'The intentional, premeditated killing of a human being by another. It is the most serious form of culpable homicide.',
    reference: 'IPC Section 300',
    bnsEquivalent: 'BNS Section 101',
    related: ['Culpable Homicide', 'Capital Punishment'],
  },
  {
    id: 2,
    term: 'Culpable Homicide',
    category: 'criminal',
    definition:
      'Causing death by doing an act with the intention of causing death, or with the knowledge that the act is likely to cause death, but without the legal definition of murder.',
    reference: 'IPC Section 299',
    bnsEquivalent: 'BNS Section 100',
    related: ['Murder', 'Manslaughter'],
  },
  {
    id: 3,
    term: 'Rape',
    category: 'criminal',
    definition:
      'Sexual intercourse with a person against their will, without their consent, or when consent is obtained by fraud or fear.',
    reference: 'IPC Section 375',
    bnsEquivalent: 'BNS Section 63',
    related: ['Sexual Assault', 'POCSO'],
  },
  {
    id: 4,
    term: 'Kidnapping',
    category: 'criminal',
    definition:
      'The taking away of a person against their will, typically involving forcefully or deceitfully moving them from their lawful guardian.',
    reference: 'IPC Section 359',
    bnsEquivalent: 'BNS Section 137',
    related: ['Abduction', 'Ransom'],
  },
  {
    id: 5,
    term: 'Theft',
    category: 'criminal',
    definition:
      "Intending to take dishonestly any movable property out of the possession of any person without that person's consent.",
    reference: 'IPC Section 378',
    bnsEquivalent: 'BNS Section 303',
    related: ['Extortion', 'Robbery'],
  },
  {
    id: 6,
    term: 'Robbery',
    category: 'criminal',
    definition:
      'An aggravated form of theft or extortion involving the imminent fear of instant death, hurt, or wrongful restraint.',
    reference: 'IPC Section 390',
    bnsEquivalent: 'BNS Section 309',
    related: ['Theft', 'Dacoity'],
  },
  {
    id: 7,
    term: 'Dacoity',
    category: 'criminal',
    definition: 'Extortion or robbery committed by five or more persons conjointly.',
    reference: 'IPC Section 391',
    bnsEquivalent: 'BNS Section 310',
    related: ['Robbery', 'Organized Crime'],
  },
  {
    id: 112,
    term: 'Extortion',
    category: 'criminal',
    definition:
      'Intentionally putting a person in fear of injury and thereby inducing them to deliver any property or valuable security.',
    reference: 'IPC Section 383',
    bnsEquivalent: 'BNS Section 308',
    related: ['Theft', 'Robbery'],
  },
  {
    id: 113,
    term: 'Forgery',
    category: 'criminal',
    definition:
      'Making a false document or electronic record with intent to cause damage or injury, or to support any claim or title.',
    reference: 'IPC Section 463',
    bnsEquivalent: 'BNS Section 336',
    related: ['Cheating', 'Counterfeiting'],
  },
  {
    id: 114,
    term: 'Abetment',
    category: 'criminal',
    definition:
      'Instigating, engaging in a conspiracy, or intentionally aiding the commission of an offence.',
    reference: 'IPC Section 107',
    bnsEquivalent: 'BNS Section 45',
    related: ['Conspiracy', 'Aid'],
  },
  {
    id: 115,
    term: 'Attempt to Commit Offence',
    category: 'criminal',
    definition:
      'Doing an act towards the commission of an offence, even if the offence is not completed.',
    reference: 'IPC Section 511',
    bnsEquivalent: 'BNS Section 62',
    related: ['Culpability', 'Mens Rea'],
  },
  {
    id: 116,
    term: 'Hurt vs Grievous Hurt',
    category: 'criminal',
    definition:
      'Hurt (BNS 115) is causing bodily pain/disease. Grievous Hurt (BNS 117) includes emasculation, permanent loss of sight/hearing, or endangering life.',
    reference: 'IPC Section 319/320',
    bnsEquivalent: 'BNS Section 115/117',
    related: ['Assault', 'Criminal Force'],
  },
  {
    id: 117,
    term: 'Wrongful Restraint',
    category: 'criminal',
    definition:
      'Voluntarily obstructing a person so as to prevent them from proceeding in any direction in which they have a right to proceed.',
    reference: 'IPC Section 339',
    bnsEquivalent: 'BNS Section 126',
    related: ['Wrongful Confinement'],
  },
  {
    id: 118,
    term: 'Wrongful Confinement',
    category: 'criminal',
    definition:
      'Restraining a person in such a manner as to prevent them from proceeding beyond certain circumscribing limits.',
    reference: 'IPC Section 340',
    bnsEquivalent: 'BNS Section 127',
    related: ['False Imprisonment', 'Wrongful Restraint'],
  },
  {
    id: 119,
    term: 'Mischief',
    category: 'criminal',
    definition:
      'Causing destruction of property or any change in property that diminishes its value or utility, with intent to cause loss.',
    reference: 'IPC Section 425',
    bnsEquivalent: 'BNS Section 324',
    related: ['Arson', 'Trespass'],
  },
  {
    id: 120,
    term: 'Criminal Conspiracy',
    category: 'criminal',
    definition:
      'When two or more persons agree to do an illegal act or a legal act by illegal means.',
    reference: 'IPC Section 120A',
    bnsEquivalent: 'BNS Section 61',
    related: ['Abetment', 'Joint Liability'],
  },
  {
    id: 121,
    term: 'Stalking',
    category: 'criminal',
    definition:
      'Following a person or contacting them repeatedly despite clear indication of disinterest; now specifically highlights monitoring electronic communication.',
    reference: 'IPC Section 354D',
    bnsEquivalent: 'BNS Section 78',
    related: ['Voyeurism', 'Harassment'],
  },
  {
    id: 122,
    term: 'Voyeurism',
    category: 'criminal',
    definition:
      'Watching or capturing images of a person engaging in a private act where they would usually expect not to be observed.',
    reference: 'IPC Section 354C',
    bnsEquivalent: 'BNS Section 77',
    related: ['Stalking', 'Privacy'],
  },
  {
    id: 8,
    term: 'Cheating (Fraud)',
    category: 'criminal',
    definition:
      'Deceiving someone fraudulently or dishonestly to deliver any property to any person, or to consent that any person shall retain any property.',
    reference: 'IPC Section 415',
    bnsEquivalent: 'BNS Section 318',
    related: ['Forgery', 'Breach of Trust'],
  },
  {
    id: 9,
    term: 'Criminal Breach of Trust',
    category: 'criminal',
    definition:
      "Dishonest misappropriation or conversion to one's own use of property entrusted to a person.",
    reference: 'IPC Section 405',
    bnsEquivalent: 'BNS Section 316',
    related: ['Cheating', 'Embezzlement'],
  },
  {
    id: 10,
    term: 'Defamation',
    category: 'criminal',
    definition:
      'Making or publishing any imputation concerning any person intending to harm, or knowing it will harm, their reputation.',
    reference: 'IPC Section 499',
    bnsEquivalent: 'BNS Section 356',
    related: ['Libel', 'Slander'],
  },
  {
    id: 11,
    term: 'Sedition',
    category: 'criminal',
    definition:
      'Words, signs, or representations that bring or attempt to bring hatred or contempt towards the Government. Now redefined to target acts endangering sovereignty.',
    reference: 'IPC Section 124A',
    bnsEquivalent: 'BNS Section 152',
    related: ['Treason', 'Unlawful Activities'],
  },
  {
    id: 12,
    term: 'Organized Crime',
    category: 'criminal',
    definition:
      'Continuing unlawful activity including kidnapping, robbery, and vehicle theft by an organized crime syndicate. Newly defined under BNS.',
    reference: 'Maharashtra Control of Organised Crime Act',
    bnsEquivalent: 'BNS Section 111',
    related: ['Gangster Act', 'Terror Attack'],
  },
  {
    id: 13,
    term: 'Terrorist Act',
    category: 'criminal',
    definition:
      'Any act committed with the intent to threaten the unity, integrity, and security of India, or to strike terror in the people.',
    reference: 'UAPA, 1967',
    bnsEquivalent: 'BNS Section 113',
    related: ['Sedition', 'National Security Act'],
  },
  {
    id: 14,
    term: 'Mob Lynching',
    category: 'criminal',
    definition:
      'When a group of five or more persons act in concert and commit murder based on race, caste, sex, or personal belief. Specifically codified in BNS.',
    reference: 'IPC 302 (General)',
    bnsEquivalent: 'BNS Section 103(2)',
    related: ['Homicide', 'Rioting'],
  },
  {
    id: 15,
    term: 'Hit and Run',
    category: 'criminal',
    definition:
      'Causing death by rash and negligent driving and escaping the scene without reporting it to a police officer or magistrate.',
    reference: 'IPC Section 304A',
    bnsEquivalent: 'BNS Section 106(2)',
    related: ['Negligence', 'Motor Vehicles Act'],
  },
  {
    id: 16,
    term: 'Bail',
    category: 'procedural',
    definition: 'Release of an accused pending trial. Governed under the criminal procedure code.',
    reference: 'CrPC Section 437',
    bnsEquivalent: 'BNSS Section 480',
    related: ['Surety', 'Remand'],
  },
  {
    id: 17,
    term: 'Anticipatory Bail',
    category: 'procedural',
    definition:
      'A direction to release a person on bail, issued even before the person is arrested.',
    reference: 'CrPC Section 438',
    bnsEquivalent: 'BNSS Section 482',
    related: ['Bail', 'Non-Bailable Offence'],
  },
  {
    id: 18,
    term: 'FIR (First Information Report)',
    category: 'procedural',
    definition:
      'A written document prepared by the police when they receive information about the commission of a cognizable offence.',
    reference: 'CrPC Section 154',
    bnsEquivalent: 'BNSS Section 173',
    related: ['Zero FIR', 'Complaint'],
  },
  {
    id: 19,
    term: 'Chargesheet',
    category: 'procedural',
    definition:
      'A formal document of accusation prepared by law-enforcement agencies in India showing the offences the accused is charged with.',
    reference: 'CrPC Section 173',
    bnsEquivalent: 'BNSS Section 193',
    related: ['Investigation', 'Court Summons'],
  },
  {
    id: 20,
    term: 'Cognizable Offence',
    category: 'criminal',
    definition:
      'A serious offence in which a police officer has the authority to make an arrest without a warrant.',
    reference: 'CrPC Section 2(c)',
    bnsEquivalent: 'BNSS Section 2(1)(g)',
    related: ['Non-Cognizable Offence', 'FIR'],
  },
  {
    id: 21,
    term: 'Non-Cognizable Offence',
    category: 'criminal',
    definition:
      'An offence in which the police has no authority to arrest without a warrant and cannot investigate without court permission.',
    reference: 'CrPC Section 2(l)',
    bnsEquivalent: 'BNSS Section 2(1)(o)',
    related: ['Cognizable Offence', 'Magistrate'],
  },
  {
    id: 22,
    term: 'Compoundable Offence',
    category: 'criminal',
    definition: 'Offences which can be settled by the parties out of court without trial.',
    reference: 'CrPC Section 320',
    bnsEquivalent: 'BNSS Section 359',
    related: ['Mutual Consent', 'Compromise'],
  },
  {
    id: 23,
    term: 'Remand',
    category: 'procedural',
    definition:
      'The act of sending an accused person back into custody while awaiting trial or further investigation.',
    reference: 'CrPC Section 167',
    bnsEquivalent: 'BNSS Section 187',
    related: ['Police Custody', 'Judicial Custody'],
  },
  {
    id: 24,
    term: 'Acquittal',
    category: 'criminal',
    definition:
      'A judgment that a person is not guilty of the crime with which the person has been charged.',
    reference: 'CrPC Section 232',
    bnsEquivalent: 'BNSS Section 255',
    related: ['Verdict', 'Exoneration'],
  },
  {
    id: 25,
    term: 'Summons',
    category: 'procedural',
    definition: 'An order to appear before a judge or magistrate, or the writ containing it.',
    reference: 'CrPC Section 61',
    bnsEquivalent: 'BNSS Section 63',
    related: ['Warrant', 'Notice'],
  },
  {
    id: 26,
    term: 'Warrant of Arrest',
    category: 'procedural',
    definition:
      'A written order issued by a judge or magistrate directing the police to arrest a person.',
    reference: 'CrPC Section 70',
    bnsEquivalent: 'BNSS Section 72',
    related: ['Search Warrant', 'Arrest'],
  },
  {
    id: 27,
    term: 'Search Warrant',
    category: 'procedural',
    definition:
      'An order issued by a magistrate authorizing law enforcement to conduct a search of a person, location, or vehicle for evidence.',
    reference: 'CrPC Section 93',
    bnsEquivalent: 'BNSS Section 96',
    related: ['Seizure', 'Evidence'],
  },
  {
    id: 28,
    term: 'Committal Proceedings',
    category: 'procedural',
    definition:
      'The process by which a Magistrate transfers a case to a Court of Session because the offence is exclusively triable by the latter.',
    reference: 'CrPC Section 209',
    bnsEquivalent: 'BNSS Section 232',
    related: ['Sessions Court', 'Magistrate'],
  },
  {
    id: 29,
    term: 'Plea Bargaining',
    category: 'procedural',
    definition:
      'A pre-trial negotiation in which the accused agrees to plead guilty in exchange for certain concessions.',
    reference: 'CrPC Section 265A',
    bnsEquivalent: 'BNSS Section 289',
    related: ['Confession', 'Sentence'],
  },
  {
    id: 30,
    term: 'Alibi',
    category: 'criminal',
    definition:
      'A defence claiming that the accused was somewhere else when a crime was committed.',
    reference: 'Indian Evidence Act Sec 11',
    bnsEquivalent: 'BSA Sec 9',
    related: ['Defence', 'Evidence'],
  },
  {
    id: 31,
    term: 'Dying Declaration',
    category: 'criminal',
    definition:
      'A statement made by a dying person as to the cause of their death, accepted as evidence.',
    reference: 'Indian Evidence Act Sec 32',
    bnsEquivalent: 'BSA Sec 26',
    related: ['Hearsay', 'Testimony'],
  },
  {
    id: 32,
    term: 'Burden of Proof',
    category: 'criminal',
    definition:
      "The obligation to prove one's assertion. In criminal cases, it generally lies on the prosecution.",
    reference: 'Indian Evidence Act Sec 101',
    bnsEquivalent: 'BSA Sec 104',
    related: ['Presumption of Innocence', 'Standard of Proof'],
  },
  {
    id: 33,
    term: 'Hostile Witness',
    category: 'procedural',
    definition:
      'A witness whose testimony is contrary to the party who called them, leading to cross-examination by their own side.',
    reference: 'Indian Evidence Act Sec 154',
    bnsEquivalent: 'BSA Sec 159',
    related: ['Perjury', 'Cross-Examination'],
  },
  {
    id: 34,
    term: 'Cross-Examination',
    category: 'procedural',
    definition:
      'The questioning of a witness called by the opposing party to challenge their testimony.',
    reference: 'Indian Evidence Act Sec 137',
    bnsEquivalent: 'BSA Sec 142',
    related: ['Examination-In-Chief', 'Witness'],
  },
  {
    id: 35,
    term: 'Electronic Record',
    category: 'procedural',
    definition:
      'Digital data submitted as evidence safely. Under the new laws, electronic records have equal legal parity with physical documents.',
    reference: 'Indian Evidence Act Sec 65B',
    bnsEquivalent: 'BSA Sec 63',
    related: ['Digital Evidence', 'Cyber Forensics'],
  },
  {
    id: 36,
    term: 'Snatching',
    category: 'criminal',
    definition:
      'Theft committed by suddenly pulling or forcibly taking away property. Specifically codified under BNS.',
    reference: 'No specific IPC Section (covered under Theft)',
    bnsEquivalent: 'BNS Section 304',
    related: ['Theft', 'Robbery'],
  },
  {
    id: 37,
    term: 'Petty Organised Crime',
    category: 'criminal',
    definition:
      'Any crime that causes general feelings of insecurity among citizens, including theft, snatching, and unauthorized selling of tickets.',
    reference: 'N/A',
    bnsEquivalent: 'BNS Section 112',
    related: ['Theft', 'Organised Crime'],
  },
  {
    id: 38,
    term: 'Adultery',
    category: 'criminal',
    definition:
      'Previously a criminal offence under IPC, it was struck down as unconstitutional by the Supreme Court but remains a civil ground for divorce.',
    reference: 'IPC Section 497 (Struck Down)',
    related: ['Divorce', 'Matrimonial Cruelty'],
  },
  {
    id: 39,
    term: 'Attempt to Suicide',
    category: 'criminal',
    definition:
      'Attempting to commit suicide was an offence but now focuses on providing care and rehabilitation under the Mental Healthcare Act.',
    reference: 'IPC Section 309',
    bnsEquivalent: 'Mental Healthcare Act, 2017',
    related: ['Mental Health', 'Decriminalization'],
  },
  {
    id: 40,
    term: 'Involuntary Intoxication',
    category: 'criminal',
    definition:
      'A state where an accused was intoxicated without their knowledge or against their will, potentially acting as a complete defence.',
    reference: 'IPC Section 85',
    bnsEquivalent: 'BNS Section 23',
    related: ['General Defences', 'Mens Rea'],
  },

  // --- CONSTITUTIONAL ---
  {
    id: 123,
    term: 'Fundamental Duties',
    category: 'constitutional',
    definition:
      'Eleven duties prescribed for citizens to inspire patriotism and promote harmony, added by the 42nd Amendment.',
    reference: 'Constitution of India, Art. 51A',
    related: ['Fundamental Rights', 'DPSP'],
  },
  {
    id: 124,
    term: "President's Rule",
    category: 'constitutional',
    definition:
      'The suspension of state government and imposition of direct Central government rule in a state when the constitutional machinery fails.',
    reference: 'Constitution of India, Art. 356',
    related: ['Emergency', 'Federalism'],
  },
  {
    id: 125,
    term: 'Constitutional Morality',
    category: 'constitutional',
    definition:
      'A judicial doctrine emphasizing adherence to the core values of the Constitution (liberty, equality, fraternity) beyond mere text.',
    reference: 'Navtej Singh Johar Case',
    related: ['Judicial Activism', 'Rule of Law'],
  },
  {
    id: 126,
    term: 'Judicial Activism',
    category: 'constitutional',
    definition:
      'When courts use their power for social justice, often going beyond existing legal precedents to protect citizen rights.',
    reference: 'Kesavananda Bharati v. Kerala',
    related: ['Judicial Review', 'PIL'],
  },
  {
    id: 127,
    term: 'Separation of Powers',
    category: 'constitutional',
    definition:
      'The division of government responsibilities into distinct branches (Legislative, Executive, Judicial) to prevent misuse of power.',
    reference: 'Constitution of India',
    related: ['Checks and Balances', 'Constitution'],
  },
  {
    id: 128,
    term: 'Collegium System',
    category: 'constitutional',
    definition:
      'The system by which judges of the Supreme Court and High Courts are appointed and transferred by a committee of senior judges.',
    reference: 'Second Judges Case (1993)',
    related: ['Judicial Independence', 'Appointments'],
  },
  {
    id: 41,
    term: 'Habeas Corpus',
    category: 'constitutional',
    definition:
      'A writ demanding that a person held in custody be brought before the court to determine if their detention is lawful.',
    reference: 'Constitution of India, Art. 32 & 226',
    related: ['Writs', 'Illegal Detention'],
  },
  {
    id: 42,
    term: 'Mandamus',
    category: 'constitutional',
    definition:
      'A writ issued to a public authority instructing it to perform a public duty that it has neglected or refused to perform.',
    reference: 'Constitution of India, Art. 32 & 226',
    related: ['Public Authority', 'Duties'],
  },
  {
    id: 43,
    term: 'Certiorari',
    category: 'constitutional',
    definition:
      "A writ issued by a higher court calling for an inferior court's records to review and if necessary, quash a decision.",
    reference: 'Constitution of India, Art. 32 & 226',
    related: ['Quash', 'Jurisdiction'],
  },
  {
    id: 44,
    term: 'Quo Warranto',
    category: 'constitutional',
    definition:
      'A writ asking a person to show by what warrant or authority they hold a public office.',
    reference: 'Constitution of India, Art. 32 & 226',
    related: ['Public Office', 'Appointment'],
  },
  {
    id: 45,
    term: 'Prohibition',
    category: 'constitutional',
    definition:
      'A writ issued to an inferior court to stop it from proceeding in a case over which it has no jurisdiction.',
    reference: 'Constitution of India, Art. 32 & 226',
    related: ['Certiorari', 'Tribunal'],
  },
  {
    id: 46,
    term: 'Basic Structure Doctrine',
    category: 'constitutional',
    definition:
      'A judicial principle stating the Constitution has basic features (like democracy, secularism) that Parliament cannot alter or amend.',
    reference: 'Kesavananda Bharati v. State of Kerala (1973)',
    related: ['Judicial Review', 'Amendments'],
  },
  {
    id: 47,
    term: 'Right to Equality',
    category: 'constitutional',
    definition:
      'The state shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    reference: 'Constitution of India, Art. 14',
    related: ['Fundamental Rights', 'Discrimination'],
  },
  {
    id: 48,
    term: 'Right to Life and Personal Liberty',
    category: 'constitutional',
    definition:
      'No person shall be deprived of his life or personal liberty except according to procedure established by law. The broadest fundamental right.',
    reference: 'Constitution of India, Art. 21',
    related: ['Due Process', 'Privacy'],
  },
  {
    id: 49,
    term: 'Right to Privacy',
    category: 'constitutional',
    definition:
      'Declared as an intrinsic part of the right to life and personal liberty under Article 21 by the Supreme Court.',
    reference: 'KS Puttaswamy v. UoI (2017)',
    related: ['Data Protection', 'Article 21'],
  },
  {
    id: 50,
    term: 'Right to Freedom of Speech',
    category: 'constitutional',
    definition:
      'Guarantees all citizens the right to free expression, subject to reasonable restrictions (like public order, security).',
    reference: 'Constitution of India, Art. 19(1)(a)',
    related: ['Defamation', 'Censorship'],
  },
  {
    id: 51,
    term: 'Prevention Detention',
    category: 'constitutional',
    definition:
      'Imprisonment of a person with the aim of preventing them from committing further offences or maintaining public order without trial.',
    reference: 'Constitution of India, Art. 22(3)',
    related: ['National Security Act', 'Arrest'],
  },
  {
    id: 52,
    term: 'Double Jeopardy',
    category: 'constitutional',
    definition:
      'A procedural defence that forbids a defendant from being tried again on the same (or similar) charges following a valid conviction or acquittal.',
    reference: 'Constitution of India, Art. 20(2)',
    related: ['Prosecution', 'Res Judicata'],
  },
  {
    id: 53,
    term: 'Self-Incrimination',
    category: 'constitutional',
    definition:
      'No person accused of any offence shall be compelled to be a witness against himself.',
    reference: 'Constitution of India, Art. 20(3)',
    related: ['Interrogation', 'Right to Silence'],
  },
  {
    id: 54,
    term: 'Ex Post Facto Laws',
    category: 'constitutional',
    definition:
      'A law that makes an act illegal that was legal when committed. The Constitution protects against criminal ex post facto laws.',
    reference: 'Constitution of India, Art. 20(1)',
    related: ['Retrospective Effect', 'Criminal Code'],
  },
  {
    id: 55,
    term: 'Public Interest Litigation (PIL)',
    category: 'constitutional',
    definition:
      'Litigation for the protection of public interest. Judicial requirement of Locus Standi is relaxed to allow any public-spirited person to approach the court.',
    reference: 'Bhagalpur Blindings Case, SP Gupta v. UoI',
    related: ['Judicial Activism', 'Locus Standi'],
  },
  {
    id: 56,
    term: 'Special Leave Petition (SLP)',
    category: 'constitutional',
    definition:
      'Residual power of the Supreme Court to grant special leave to appeal from any judgment or order in any matter from any court/tribunal in India.',
    reference: 'Constitution of India, Art. 136',
    related: ['Appellate Jurisdiction', 'Review Petition'],
  },
  {
    id: 57,
    term: 'Curative Petition',
    category: 'constitutional',
    definition:
      'The absolute final option after a review petition is rejected, developed by the Supreme Court to cure gross miscarriages of justice.',
    reference: 'Rupa Ashok Hurra v. Ashok Hurra (2002)',
    related: ['Review Petition', 'SLP'],
  },
  {
    id: 58,
    term: 'Review Petition',
    category: 'constitutional',
    definition:
      'A petition requesting the Supreme Court to review its own ruling, usually relying on errors apparent on the face of the record.',
    reference: 'Constitution of India, Art. 137',
    related: ['Curative Petition', 'Supreme Court'],
  },
  {
    id: 59,
    term: 'Directive Principles of State Policy (DPSP)',
    category: 'constitutional',
    definition:
      'Guidelines/principles given to the central and state governments to keep in mind while framing laws. They are fundamental in the governance of the country but are non-justiciable.',
    reference: 'Constitution of India, Part IV',
    related: ['Welfare State', 'Fundamental Duties'],
  },
  {
    id: 60,
    term: 'Right to Property',
    category: 'constitutional',
    definition:
      'Originally a fundamental right, it is now a constitutional right stating no person shall be deprived of property save by authority of law.',
    reference: 'Constitution of India, Art. 300A',
    related: ['Eminent Domain', 'Land Acquisition'],
  },

  // --- CIVIL PROCEDURE ---
  {
    id: 129,
    term: 'Easement Rights',
    category: 'civil',
    definition:
      'The right of one property owner to use the land of another for a specific purpose, like a right of way or access to water.',
    reference: 'Indian Easements Act, 1882',
    related: ['Prescription', 'Servitude'],
  },
  {
    id: 130,
    term: 'Adverse Possession',
    category: 'civil',
    definition:
      "A legal doctrine where a person who occupies another's land for 12+ years openly and continuously can claim legal title.",
    reference: 'Limitation Act, 1963',
    related: ['Title', 'Dispossession'],
  },
  {
    id: 131,
    term: 'Mesne Profits',
    category: 'civil',
    definition:
      'Profits which the person in wrongful possession of property actually received or might have received with ordinary diligence.',
    reference: 'Civil Procedure Code, Sec 2(12)',
    related: ['Wrongful Possession', 'Damages'],
  },
  {
    id: 132,
    term: 'Lis Pendens',
    category: 'civil',
    definition:
      'A doctrine stating that while a suit is pending regarding property, the property cannot be transferred to another person.',
    reference: 'Transfer of Property Act, Sec 52',
    related: ['Notice', 'Attachment'],
  },
  {
    id: 133,
    term: 'Attachment Before Judgment',
    category: 'civil',
    definition:
      "A court order to seize or prevent transfer of a defendant's property before the final judgment to ensure decree satisfaction.",
    reference: 'Civil Procedure Code, Order XXXVIII',
    related: ['Injunction', 'Garnishee'],
  },
  {
    id: 61,
    term: 'Plaint',
    category: 'civil',
    definition:
      "The formal written statement outlining the plaintiff's claim against the defendant, thereby initiating a civil lawsuit.",
    reference: 'Civil Procedure Code, Order VII',
    related: ['Written Statement', 'Suit'],
  },
  {
    id: 62,
    term: 'Written Statement',
    category: 'civil',
    definition:
      "The defendant's formal reply to the plaintiff’s plaint, admitting or denying the allegations.",
    reference: 'Civil Procedure Code, Order VIII',
    related: ['Plaint', 'Defence'],
  },
  {
    id: 63,
    term: 'Decree',
    category: 'civil',
    definition:
      'The formal expression of an adjudication that conclusively determines the rights of the parties with regard to all or any of the matters in controversy in the suit.',
    reference: 'Civil Procedure Code, Sec 2(2)',
    related: ['Judgment', 'Order'],
  },
  {
    id: 64,
    term: 'Res Judicata',
    category: 'civil',
    definition:
      'A matter already judged. A doctrine that prevents the same parties from litigating the same issue again after a final judgment has been reached.',
    reference: 'Civil Procedure Code, Sec 11',
    related: ['Double Jeopardy', 'Finality'],
  },
  {
    id: 65,
    term: 'Res Sub Judice',
    category: 'civil',
    definition:
      'A matter under judgment. It prevents a court from proceeding with a trial in a suit in which the issue is already pending before another competent court.',
    reference: 'Civil Procedure Code, Sec 10',
    related: ['Res Judicata', 'Stay of Suit'],
  },
  {
    id: 66,
    term: 'Ex Parte',
    category: 'civil',
    definition:
      'A judicial proceeding, order, or injunction made by the court in the absence of one of the parties, usually the defendant.',
    reference: 'Civil Procedure Code, Order IX',
    related: ['Default Judgment', 'Appearance'],
  },
  {
    id: 67,
    term: 'Injunction',
    category: 'civil',
    definition:
      'A court order commanding or preventing an action to protect a legal right or prevent irreversible damage.',
    reference: 'Civil Procedure Code, Order XXXIX',
    related: ['Restraining Order', 'Specific Relief'],
  },
  {
    id: 69,
    term: 'Garnishee Order',
    category: 'civil',
    definition:
      'A court order directing a third party (like a bank) who holds money belonging to a debtor to directly pay it to the creditor to satisfy a judgment.',
    reference: 'Civil Procedure Code, Order XXI Rule 46',
    related: ['Execution', 'Attachment'],
  },
  {
    id: 70,
    term: 'Limitation Period',
    category: 'civil',
    definition:
      'The legally specified period beyond which a legal action cannot be brought before the court.',
    reference: 'Limitation Act, 1963',
    related: ['Time Barred', 'Condonation of Delay'],
  },
  {
    id: 71,
    term: 'Lok Adalat',
    category: 'civil',
    definition:
      'A forum where cases pending in a court of law or at pre-litigation stage are settled amicably through negotiation.',
    reference: 'Legal Services Authorities Act, 1987',
    related: ['ADR', 'Arbitration'],
  },
  {
    id: 72,
    term: 'Arbitration',
    category: 'civil',
    definition:
      'A form of alternative dispute resolution where independent third parties render a binding decision.',
    reference: 'Arbitration and Conciliation Act, 1996',
    related: ['Award', 'Mediation'],
  },
  {
    id: 73,
    term: 'Specific Performance',
    category: 'civil',
    definition:
      'An order of the court directing a party to exactly perform their duties as outlined in a contract, rather than just paying damages.',
    reference: 'Specific Relief Act, 1963',
    related: ['Breach of Contract', 'Injunction'],
  },
  {
    id: 74,
    term: 'Tort',
    category: 'civil',
    definition:
      'A civil wrong (other than breach of contract) that causes a claimant to suffer loss or harm, resulting in legal liability.',
    reference: 'Law of Torts',
    related: ['Negligence', 'Damages'],
  },
  {
    id: 75,
    term: 'Pecuniary Jurisdiction',
    category: 'civil',
    definition:
      'The authority of a court over a case depending on the monetary value of the matter under dispute.',
    reference: 'Civil Procedure Code, Sec 6',
    related: ['Territorial Jurisdiction', 'Court Fees'],
  },

  // --- FAMILY & MATRIMONIAL ---
  {
    id: 134,
    term: 'Guardianship',
    category: 'family',
    definition:
      'The legal right and responsibility to care for a minor or a person unable to care for themselves.',
    reference: 'Hindu Minority and Guardianship Act',
    related: ['Custody', 'Ward'],
  },
  {
    id: 135,
    term: 'Adoption (CARA)',
    category: 'family',
    definition:
      'The legal process of permanently transferring parental rights from biological parents to adoptive parents, regulated by the Central Adoption Resource Authority.',
    reference: 'Juvenile Justice Act / HAMA',
    related: ['Adoption', 'Foster Care'],
  },
  {
    id: 136,
    term: 'Irretrievable Breakdown',
    category: 'family',
    definition:
      'A condition where a marriage has completely failed and there is no chance of reconciliation; currently recommended but not a statutory ground under HMA.',
    reference: 'Suprene Court - Article 142',
    related: ['Mutual Divorce', 'Cruelty'],
  },
  {
    id: 137,
    term: 'Khula',
    category: 'family',
    definition:
      'A form of divorce in Muslim law initiated by the wife by returning the dower (Mahr) or some property to the husband.',
    reference: 'Muslim Personal Law',
    related: ['Talaq', 'Mahr'],
  },
  {
    id: 138,
    term: 'Mahr/Mehr',
    category: 'family',
    definition:
      'A mandatory payment or gift given by the groom to the bride at the time of a Muslim marriage for her exclusive use.',
    reference: 'Muslim Personal Law',
    related: ['Dower', 'Khula'],
  },
  {
    id: 76,
    term: 'Restitution of Conjugal Rights',
    category: 'family',
    definition:
      'A legal remedy available to a spouse when the other spouse has withdrawn from their society without reasonable excuse, ordering them to live together.',
    reference: 'Hindu Marriage Act, Sec 9',
    related: ['Divorce', 'Judicial Separation'],
  },
  {
    id: 77,
    term: 'Judicial Separation',
    category: 'family',
    definition:
      'A legal suspension of marriage without dissolving it, giving the couple time to decide whether to officially divorce.',
    reference: 'Hindu Marriage Act, Sec 10',
    related: ['Divorce', 'Maintenance'],
  },
  {
    id: 78,
    term: 'Mutual Consent Divorce',
    category: 'family',
    definition:
      'A divorce procedure where both spouses agree that the marriage has irretrievably broken down and jointly file a petition.',
    reference: 'Hindu Marriage Act, Sec 13B',
    related: ['Cooling-off Period', 'Alimony'],
  },
  {
    id: 79,
    term: 'Maintenance / Pendente Lite',
    category: 'family',
    definition:
      'Financial support ordered by the court to be paid by one spouse to another during the pendency of a divorce suit or post-divorce.',
    reference: 'Hindu Marriage Act Sec 24; BNSS 144',
    related: ['Alimony', 'Divorce'],
  },
  {
    id: 80,
    term: 'Alimony',
    category: 'family',
    definition:
      'Permanent or lump-sum financial support paid to a former spouse after a divorce is finalized.',
    reference: 'Hindu Marriage Act, Sec 25',
    related: ['Maintenance', 'Separation'],
  },
  {
    id: 81,
    term: 'Cruelty (Matrimonial)',
    category: 'family',
    definition:
      'Physical or mental abuse causing reasonable apprehension of harm. A primary ground for filing for contested divorce.',
    reference: 'Hindu Marriage Act Sec 13(1)(ia)',
    related: ['Domestic Violence', 'Dowry Death'],
  },
  {
    id: 82,
    term: 'Dowry Demand',
    category: 'family',
    definition:
      'Demanding property or valuable security directly or indirectly by one party from the other in connection with marriage. A serious criminal offence.',
    reference: 'Dowry Prohibition Act, 1961',
    bnsEquivalent: 'BNS 84',
    related: ['Cruelty', 'Dowry Death'],
  },
  {
    id: 83,
    term: 'Child Custody',
    category: 'family',
    definition:
      "Legal guardianship and responsibility for a child's care, control, and maintenance after parents divorce.",
    reference: 'Guardians and Wards Act, 1890',
    related: ['Visitation Rights', 'Best Interests'],
  },
  {
    id: 84,
    term: 'Stridhan',
    category: 'family',
    definition:
      'Property or gifts presented to a Hindu woman during her wedding, over which she retains absolute ownership and control.',
    reference: 'Hindu Succession Act',
    related: ['Dowry', 'Property Rights'],
  },
  {
    id: 85,
    term: 'Mitakshara & Dayabhaga',
    category: 'family',
    definition:
      'The two major schools of Hindu Law governing succession, inheritance, and the Hindu Undivided Family (HUF).',
    reference: 'Hindu Succession Act, 1956 (Amended 2005)',
    related: ['Coparcenary', 'HUF'],
  },
  {
    id: 86,
    term: 'Coparcener',
    category: 'family',
    definition:
      'A person who acquires an interest in joint Hindu family property by birth. Since 2005, daughters are also coparceners.',
    reference: 'Hindu Succession (Amendment) Act, 2005',
    related: ['HUF', 'Inheritance'],
  },

  // --- CORPORATE & CONTRACT ---
  {
    id: 139,
    term: 'Non-Disclosure Agreement',
    category: 'corporate',
    definition:
      'A legal contract between parties to keep certain information confidential and not disclose it to third parties.',
    reference: 'Contract Act, 1872',
    related: ['Confidentiality', 'Trade Secret'],
  },
  {
    id: 140,
    term: 'Due Diligence',
    category: 'corporate',
    definition:
      'The comprehensive investigation of a business or person prior to signing a contract, especially for mergers or investments.',
    reference: 'Corporate Law',
    related: ['Compliance', 'Audit'],
  },
  {
    id: 141,
    term: 'Promissory Note',
    category: 'corporate',
    definition:
      'A signed document containing a written promise to pay a stated sum to a specified person at a specified date or on demand.',
    reference: 'Negotiable Instruments Act',
    related: ['Debt', 'Contract'],
  },
  {
    id: 142,
    term: 'Power of Attorney',
    category: 'corporate',
    definition:
      "A legal document authorizing another person to act on one's behalf in private affairs, business, or legal matters.",
    reference: 'Powers of Attorney Act, 1882',
    related: ['Agent', 'Vakalatnama'],
  },
  {
    id: 143,
    term: 'Stamp Duty',
    category: 'corporate',
    definition:
      'A tax levied by the government on legal documents, usually in the transfer of assets or property.',
    reference: 'Indian Stamp Act, 1899',
    related: ['Registration', 'Court Fee'],
  },
  {
    id: 87,
    term: 'Memorandum of Association (MoA)',
    category: 'corporate',
    definition:
      'The fundamental constitution of a company, defining its scope, powers, and relationship with the outside world.',
    reference: 'Companies Act, 2013, Sec 4',
    related: ['Articles of Association', 'Ultra Vires'],
  },
  {
    id: 88,
    term: 'Articles of Association (AoA)',
    category: 'corporate',
    definition:
      'The internal bylaws of a company that regulate its daily management and internal affairs.',
    reference: 'Companies Act, 2013, Sec 5',
    related: ['MoA', 'Corporate Governance'],
  },
  {
    id: 89,
    term: 'Corporate Veil',
    category: 'corporate',
    definition:
      'A legal concept separating the identity of a corporation from its shareholders, protecting them from personal liability. Courts can "pierce" this veil if fraud is detected.',
    reference: 'Corporate Law Principle',
    related: ['Limited Liability', 'Fraud'],
  },
  {
    id: 90,
    term: 'Winding Up',
    category: 'corporate',
    definition:
      'The legal process of closing down a company, liquidating its assets, paying off debts, and distributing the remainder.',
    reference: 'Companies Act, 2013 / IBC, 2016',
    related: ['Insolvency', 'Liquidation'],
  },
  {
    id: 91,
    term: 'Force Majeure',
    category: 'corporate',
    definition:
      'A contract clause that frees both parties from liability or obligation when an extraordinary event or circumstance beyond their control prevents fulfillment.',
    reference: 'Indian Contract Act, 1872, Sec 56',
    related: ['Act of God', 'Frustration of Contract'],
  },
  {
    id: 92,
    term: 'Breach of Contract',
    category: 'corporate',
    definition:
      'An unexcused failure to perform any promise that forms all or part of a legal contract.',
    reference: 'Indian Contract Act, 1872',
    related: ['Damages', 'Specific Performance'],
  },
  {
    id: 93,
    term: 'Liquidated Damages',
    category: 'corporate',
    definition:
      'A predetermined sum of money stipulated in a contract to be paid in the event of a breach.',
    reference: 'Indian Contract Act, 1872, Sec 74',
    related: ['Penalty', 'Breach of Contract'],
  },
  {
    id: 94,
    term: 'Fiduciary Duty',
    category: 'corporate',
    definition:
      "A legal obligation of one party to act in the best interest of another, such as a company director's duty to shareholders.",
    reference: 'Companies Act, 2013, Sec 166',
    related: ['Director', 'Trust'],
  },
  {
    id: 95,
    term: 'Insolvency and Bankruptcy Code (IBC)',
    category: 'corporate',
    definition:
      'A consolidated law resolving insolvencies in India, drastically speeding up the corporate liquidation and restructuring process.',
    reference: 'Insolvency and Bankruptcy Code, 2016',
    related: ['NCLT', 'Liquidation'],
  },
  {
    id: 96,
    term: 'Copyright',
    category: 'corporate',
    definition:
      'An exclusive right granted to creators of original literary, dramatic, musical, or artistic works.',
    reference: 'Copyright Act, 1957',
    related: ['Intellectual Property', 'Trademark'],
  },
  {
    id: 97,
    term: 'Trademark',
    category: 'corporate',
    definition:
      'A recognizable sign, design, or expression which identifies products or services of a particular source.',
    reference: 'Trade Marks Act, 1999',
    related: ['Intellectual Property', 'Passing Off'],
  },

  // --- PROCEDURAL ---
  {
    id: 144,
    term: 'Affidavit',
    category: 'procedural',
    definition:
      'A written statement confirmed by oath or affirmation, for use as evidence in court.',
    reference: 'Civil Procedure Code / Evidence Act',
    related: ['Oath', 'Evidence'],
  },
  {
    id: 145,
    term: 'Vakalatnama',
    category: 'procedural',
    definition:
      'A document by which a party to a case authorizes an advocate to represent them in court.',
    reference: 'Bar Council of India Rules',
    related: ['Power of Attorney', 'Advocate'],
  },
  {
    id: 146,
    term: 'Interlocutory Application',
    category: 'procedural',
    definition:
      'An application filed during the pendency of a main case to seek interim or temporary relief.',
    reference: 'Civil Procedure Code',
    related: ['Interim Order', 'Stay'],
  },
  {
    id: 147,
    term: 'Court Fee',
    category: 'procedural',
    definition:
      'A mandatory fee paid to the government for filing and processing a case in various courts.',
    reference: 'Court Fees Act, 1870',
    related: ['Stamp Duty', 'Legal Aid'],
  },
  {
    id: 148,
    term: 'Caveat Petition',
    category: 'procedural',
    definition:
      'A notice to the court to not pass any order in a matter without hearing the petitioner first.',
    reference: 'Civil Procedure Code Sec 148A',
    related: ['Caveat', 'Notice'],
  },
  {
    id: 149,
    term: 'Execution Petition',
    category: 'procedural',
    definition: 'An application filed to enforce a decree or judgment passed by a court.',
    reference: 'Civil Procedure Code, Order XXI',
    related: ['Decree', 'Attachment'],
  },
  {
    id: 110,
    term: 'Caveat Emptor',
    category: 'consumer',
    definition:
      'Literally "let the buyer beware". The principle that the buyer alone is responsible for checking the quality and suitability of goods before making a purchase.',
    reference: 'Latin Maxim',
    related: ['Consumer Protection', 'Contract'],
  },
  {
    id: 98,
    term: 'Right to Information (RTI)',
    category: 'procedural',
    definition:
      'The right empowering citizens to seek information from any public authority, enhancing transparency.',
    reference: 'RTI Act, 2005',
    related: ['PIO', 'Transparency'],
  },
  {
    id: 99,
    term: 'Unfair Trade Practice',
    category: 'consumer',
    definition:
      'Deceptive, fraudulent, or unethical methods employed by businesses to sell goods or services, like false advertising.',
    reference: 'Consumer Protection Act, 2019',
    related: ['CCPA', 'Misleading Ads'],
  },
  {
    id: 100,
    term: 'Product Liability',
    category: 'consumer',
    definition:
      'The responsibility of a product manufacturer or seller to compensate for injury or damage caused by defective products.',
    reference: 'Consumer Protection Act, 2019',
    related: ['Defect', 'Damages'],
  },
  {
    id: 150,
    term: 'Deficiency of Service',
    category: 'consumer',
    definition:
      'Any fault, imperfection, or inadequacy in the quality, nature, or manner of performance required under a contract.',
    reference: 'Consumer Protection Act, 2019',
    related: ['Unfair Trade', 'Liability'],
  },
  {
    id: 151,
    term: 'Unfair Contract',
    category: 'consumer',
    definition:
      'A contract between a manufacturer/trader and a consumer which has terms that significantly change the rights of such consumer.',
    reference: 'Consumer Protection Act, 2019',
    related: ['Standard Terms', 'CCPA'],
  },
  {
    id: 152,
    term: 'District Commission',
    category: 'consumer',
    definition:
      'The consumer dispute redressal commission at the district level for claims up to ₹50 lakh.',
    reference: 'Consumer Protection Act, 2019',
    related: ['State Commission', 'Redressal'],
  },

  // --- LATIN MAXIMS ---
  {
    id: 153,
    term: 'Res Ipsa Loquitur',
    category: 'latin_maxim',
    definition:
      'Literally "the thing speaks for itself". A principle that allows a court to infer negligence from the very nature of an accident.',
    reference: 'Law of Torts',
    related: ['Negligence', 'Duty of Care'],
  },
  {
    id: 154,
    term: 'Volenti Non Fit Injuria',
    category: 'latin_maxim',
    definition:
      'Literally "to a willing person, no injury is done". A defence that a person who knowingly and voluntarily risks injury cannot sue for damages.',
    reference: 'Law of Torts',
    related: ['Assumption of Risk', 'Consent'],
  },
  {
    id: 155,
    term: 'Damnum Sine Injuria',
    category: 'latin_maxim',
    definition:
      'Literally "damage without injury". Loss or harm suffered without any violation of a legal right.',
    reference: 'Gloucester Grammar School case',
    related: ['Legal Right', 'Tort'],
  },
  {
    id: 156,
    term: 'Injuria Sine Damno',
    category: 'latin_maxim',
    definition:
      'Literally "injury without damage". Violation of a legal right without any actual loss or harm.',
    reference: 'Ashby v White',
    related: ['Legal Right', 'Nominal Damages'],
  },
  {
    id: 157,
    term: 'Nemo Judex In Causa Sua',
    category: 'latin_maxim',
    definition:
      'Literally "no one should be a judge in their own cause". A core principle of natural justice forbidding bias.',
    reference: 'Natural Justice',
    related: ['Bias', 'Fair Hearing'],
  },
  {
    id: 158,
    term: 'Uberrimae Fidei',
    category: 'latin_maxim',
    definition:
      'Literally "of the utmost good faith". A principle in insurance contracts requiring full disclosure of all material facts.',
    reference: 'Insurance Law',
    related: ['Good Faith', 'Disclosure'],
  },
  {
    id: 159,
    term: 'Doli Incapax',
    category: 'latin_maxim',
    definition:
      'Literally "incapable of deceit". A presumption that a child under a certain age (7 in India) cannot be held criminally liable.',
    reference: 'IPC Section 82',
    bnsEquivalent: 'BNS Section 20',
    related: ['Minor', 'Culpability'],
  },
  {
    id: 160,
    term: 'In Pari Delicto',
    category: 'latin_maxim',
    definition:
      'Literally "in equal fault". A principle that where both parties are equally at fault, the court will not assist either.',
    reference: 'Contract Law',
    related: ['Illegal Contract', 'Restitution'],
  },
  {
    id: 161,
    term: 'Per Incuriam',
    category: 'latin_maxim',
    definition:
      'Literally "through lack of care". A judgment passed in ignorance of a binding precedent or statutory provision.',
    reference: 'Doctrine of Precedent',
    related: ['Stare Decisis', 'Overruled'],
  },
  {
    id: 101,
    term: 'Mens Rea',
    category: 'latin_maxim',
    definition:
      'Literally "guilty mind". The intention or knowledge of wrongdoing that constitutes part of a crime.',
    reference: 'Latin Maxim',
    related: ['Actus Reus', 'Culpability'],
  },
  {
    id: 102,
    term: 'Actus Reus',
    category: 'latin_maxim',
    definition: 'Literally "guilty act". The objective, physical action of committing a crime.',
    reference: 'Latin Maxim',
    related: ['Mens Rea', 'Commission'],
  },
  {
    id: 103,
    term: 'Amicus Curiae',
    category: 'latin_maxim',
    definition:
      'Literally "friend of the court". An impartial adviser who assists the court by offering information or insight on issues of law.',
    reference: 'Latin Maxim',
    related: ['Intervenor', 'Supreme Court'],
  },
  {
    id: 104,
    term: 'Locus Standi',
    category: 'latin_maxim',
    definition:
      'Literally "standing". The right or capacity to bring an action or to appear in a court.',
    reference: 'Latin Maxim',
    related: ['PIL', 'Party'],
  },
  {
    id: 109,
    term: 'Audi Alteram Partem',
    category: 'latin_maxim',
    definition:
      'Literally "listen to the other side". A principle of natural justice stating that no person should be judged without a fair hearing.',
    reference: 'Latin Maxim / Natural Justice',
    related: ['Due Process', 'Ex Parte'],
  },

  // --- DIGITAL LAW ---
  {
    id: 162,
    term: 'Cyberstalking',
    category: 'digital_law',
    definition: 'Using the internet or other electronic means to stalk or harass an individual.',
    reference: 'IT Act, Sec 66D / BNS 78',
    related: ['Harassment', 'Digital Privacy'],
  },
  {
    id: 163,
    term: 'Phishing',
    category: 'digital_law',
    definition:
      'Fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity in an electronic communication.',
    reference: 'IT Act, 2000',
    related: ['Cyber Fraud', 'Identity Theft'],
  },
  {
    id: 164,
    term: 'Data Fiduciary',
    category: 'digital_law',
    definition: 'Any person who determines the purpose and means of processing of personal data.',
    reference: 'DPDP Act, 2023',
    related: ['Data Principal', 'Processing'],
  },
  {
    id: 165,
    term: 'Data Principal',
    category: 'digital_law',
    definition: 'The individual to whom the personal data relates.',
    reference: 'DPDP Act, 2023',
    related: ['Data Fiduciary', 'Data Subject'],
  },
  {
    id: 166,
    term: 'Consent Manager',
    category: 'digital_law',
    definition:
      'A person registered with the Board who acts as a single point of contact for a Data Principal to manage their consent.',
    reference: 'DPDP Act, 2023',
    related: ['Consent', 'DPDP Board'],
  },
  {
    id: 167,
    term: 'Intermediary Liability',
    category: 'digital_law',
    definition:
      'The legal responsibility of service providers (like ISPs, social media) for content posted by their users.',
    reference: 'IT Act, Sec 79',
    related: ['Safe Harbour', 'Due Diligence'],
  },
  {
    id: 168,
    term: 'Safe Harbour Provision',
    category: 'digital_law',
    definition:
      'A legal provision to protect intermediaries from liability for third-party content, provided they follow due diligence.',
    reference: 'IT Act, 2000',
    related: ['Intermediary', 'Platform'],
  },
  {
    id: 169,
    term: 'Cyber Terrorism',
    category: 'digital_law',
    definition:
      'Acts involving the use of computers, networks, or the internet to cause widespread harm or terror for political or ideological motives.',
    reference: 'IT Act, Sec 66F',
    related: ['National Security', 'Malware'],
  },
];

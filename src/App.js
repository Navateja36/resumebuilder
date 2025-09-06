    // this code is for people who wants to select the text from the pdf 
    import React, { useState,  forwardRef } from 'react';
    import { Page, Text, View, Document, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';
    import './App.css';

    Font.register({
    family: 'Times-Roman',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/timesnewroman/v16/times-regular.ttf' },
        { src: 'https://fonts.gstatic.com/s/timesnewroman/v16/times-bold.ttf', fontWeight: 'bold' },
        { src: 'https://fonts.gstatic.com/s/timesnewroman/v16/times-italic.ttf', fontStyle: 'italic' },
        { src: 'https://fonts.gstatic.com/s/timesnewroman/v16/times-bold-italic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
    });

    const pdfStyles = StyleSheet.create({
        page: {
        // CHANGED: Reduced vertical padding, kept horizontal for centering
        paddingTop: 30,
        paddingBottom: 40,
        paddingHorizontal: 50,
        fontFamily: 'Times-Roman',
        fontSize: 10, // CHANGED: Set a smaller base font size
        lineHeight: 1.3, // CHANGED: Tightened line height
        color: '#222',
        },
        header: {
            textAlign: 'center',
            marginBottom: 10,
        },
        name: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 19, // CHANGED: Increased from 2 to 5 to add more space
        },
        contactInfo: {
            fontSize: 10,
        },
        section: {
        marginBottom: 8, // CHANGED: Reduced space between major sections
        },
        sectionTitle: {
        fontSize: 12, // CHANGED: Slightly smaller section titles
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
        borderBottomWidth: 1.5,
        borderBottomColor: '#333',
        paddingBottom: 3,
        },
        entry: {
        marginLeft: 15, // CHANGED: Slightly less indent
        marginBottom: 6, // CHANGED: Reduced space between entries
        },
        entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
        },
        title: {
        fontSize: 10.5,
        fontWeight: 'bold',
        },
        subTitle: {
        fontSize: 10,
        fontStyle: 'italic',
        },
        bulletPoints: {
        marginTop: 2,
        },
        bullet: {
        fontSize: 10,
        },
        skillsSection: {
        marginLeft: 15, // CHANGED: Matched new indent
        },
        skillLine: {
        fontSize: 10,
        },
        bold: {
        fontWeight: 'bold',
        },
    });


    const ResumeDocument = ({ resumedata }) => (
    <Document>
        <Page size="LETTER" style={pdfStyles.page}>
        
        <View style={pdfStyles.header}>
            <Text style={pdfStyles.name}>{resumedata.personalinfo.username}</Text>
            <Text style={pdfStyles.contactInfo}>
                {resumedata.personalinfo.phonenumber} | {resumedata.personalinfo.email} | {resumedata.personalinfo.linkedin} | {resumedata.personalinfo.github}
            </Text>
        </View>

        <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Education</Text>
            {resumedata.education.map((edu, index) => (
            <View key={index} style={pdfStyles.entry}>
                <View style={pdfStyles.entryHeader}>
                <Text style={pdfStyles.title}>{edu.collegename}</Text>
                <Text>{edu.timeline}</Text>
                </View>
                <View style={pdfStyles.entryHeader}>
                <Text style={pdfStyles.subTitle}>{edu.courseName}</Text>
                <Text>{edu.location}</Text>
                </View>
            </View>
            ))}
        </View>

        <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Experience</Text>
            {resumedata.experience.map((exp, index) => (
            <View key={index} style={pdfStyles.entry}>
                <View style={pdfStyles.entryHeader}>
                <Text style={pdfStyles.title}>{exp.role}</Text>
                <Text>{exp.timeline}</Text>
                </View>
                <View style={pdfStyles.entryHeader}>
                <Text style={pdfStyles.subTitle}>{exp.company}</Text>
                <Text>{exp.location}</Text>
                </View>
                <View style={pdfStyles.bulletPoints}>
                    {exp.description.split('\n').map((point, i) => (
                        <Text key={i} style={pdfStyles.bullet}>• {point}</Text>
                    ))}
                </View>
            </View>
            ))}
        </View>

        <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Projects</Text>
            {resumedata.projects.map((proj, index) => (
                <View key={index} style={pdfStyles.entry}>
                    <View style={pdfStyles.entryHeader}>
                        <Text>
                            <Text style={pdfStyles.title}>{proj.name}</Text>
                            <Text style={pdfStyles.subTitle}> | {proj.techStack}</Text>
                        </Text>
                        <Text>{proj.timeline}</Text>
                    </View>
                    <View style={pdfStyles.bulletPoints}>
                        {proj.description.split('\n').map((point, i) => (
                            <Text key={i} style={pdfStyles.bullet}>• {point}</Text>
                        ))}
                    </View>
                </View>
            ))}
        </View>

        <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Technical Skills</Text>
            <View style={pdfStyles.skillsSection}>
                <Text style={pdfStyles.skillLine}><Text style={pdfStyles.bold}>Languages:</Text> {resumedata.skills.languages}</Text>
                <Text style={pdfStyles.skillLine}><Text style={pdfStyles.bold}>Frameworks:</Text> {resumedata.skills.frameworks}</Text>
                <Text style={pdfStyles.skillLine}><Text style={pdfStyles.bold}>Developer Tools:</Text> {resumedata.skills.tools}</Text>
                <Text style={pdfStyles.skillLine}><Text style={pdfStyles.bold}>Libraries:</Text> {resumedata.skills.libraries}</Text>
            </View>
        </View>
        </Page>
    </Document>
    );

    function Filldata({resumedata, handleChange, addArrayItem, deleteArrayItem, handleArrayChange, downloadButton}){
        const sectionStyle = { marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '25px' };
        const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
        const buttonStyle = { padding: '10px 15px', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' };
        const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#dc3545'};
        
        return(
            <div>
                <div style={{...sectionStyle, borderBottom: 'none'}}>
                    {downloadButton}
                </div>
                <div style={sectionStyle}>
                    <h2>Personal Information</h2>
                    <input type="text" style={inputStyle} placeholder='Full Name' name='username' value={resumedata.personalinfo.username} onChange={(e)=>handleChange('personalinfo',e)}/>
                    <input type="email" style={inputStyle} placeholder='Email ID' value={resumedata.personalinfo.email} onChange={(e)=>handleChange('personalinfo',e)} name='email'/>
                    <input type="tel" style={inputStyle} placeholder='Phone Number' value={resumedata.personalinfo.phonenumber}  onChange={(e)=>handleChange('personalinfo',e)} name='phonenumber'/>
                    <input type="text" style={inputStyle} placeholder='LinkedIn Profile URL' value={resumedata.personalinfo.linkedin} onChange={(e)=>handleChange('personalinfo',e)} name='linkedin' />
                    <input type="text" style={inputStyle} placeholder='GitHub Profile URL' value={resumedata.personalinfo.github} onChange={(e)=>handleChange('personalinfo',e)} name='github'/>
                </div>
                <div style={sectionStyle}>
                    <h2>Education Details</h2>
                    {resumedata.education.map((edu,index)=>(
                        <div key={index} style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '4px'}}>
                            <input name='collegename' style={inputStyle} type="text" value={edu.collegename}  placeholder='College/University Name'  onChange={(e)=>handleArrayChange('education',index,e)} />
                            <input name='courseName' style={inputStyle} type="text" value={edu.courseName}  placeholder='Degree & Major (e.g., Bachelor of Science in CS)' onChange={(e)=>handleArrayChange('education',index,e)}/>
                            <input name='location' style={inputStyle} type="text" value={edu.location}  placeholder='Location (e.g., Bryan, TX)' onChange={(e)=>handleArrayChange('education',index,e)} />
                            <input name='timeline' style={inputStyle} type="text" value={edu.timeline} placeholder='Timeline (e.g., Aug. 2018 - May 2021)' onChange={(e)=>handleArrayChange('education',index,e)} />
                            <button type='button' style={deleteButtonStyle} onClick={()=>deleteArrayItem('education',index)}>Delete Education</button>
                        </div>
                    ))}
                    <button type='button' style={buttonStyle} onClick={()=>addArrayItem('education')}>Add Education</button>
                </div>
                <div style={sectionStyle}>
                    <h2>Experience Details</h2>
                    {resumedata.experience.map((exp,index)=>(
                        <div key={index} style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '4px'}}>
                            <input type="text" style={inputStyle} name='company' placeholder='Company Name' value={exp.company} onChange={(e)=>handleArrayChange('experience',index,e)} />
                            <input type="text" style={inputStyle} name='role' placeholder='Role / Job Title' value={exp.role} onChange={(e)=>handleArrayChange('experience',index,e)} />
                            <input type="text" style={inputStyle} name='location' placeholder='Location (e.g., College Station, TX)' value={exp.location} onChange={(e)=>handleArrayChange('experience',index,e)} />
                            <input type="text" style={inputStyle} name='timeline' placeholder='Timeline (e.g., June 2020 - Present)' value={exp.timeline} onChange={(e)=>handleArrayChange('experience',index,e)} />
                            <textarea name="description" style={inputStyle} placeholder='Describe your work. Use a new line for each point.' value={exp.description} onChange={(e) => handleArrayChange('experience', index, e)}></textarea>
                            <button type="button" style={deleteButtonStyle} onClick={() => deleteArrayItem('experience', index)}>Delete Experience</button>
                        </div>
                    ))}
                    <button type='button' style={buttonStyle} onClick={()=>addArrayItem('experience')}>Add Experience</button>
                </div>
                <div style={sectionStyle}>
                    <h2>Project Details</h2>
                    {resumedata.projects.map((proj,index)=>(
                        <div key={index} style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '4px'}}>
                            <input type="text" style={inputStyle} name='name' placeholder='Project Name' value={proj.name} onChange={(e)=>handleArrayChange('projects',index,e)} />
                            <input 
                                type="url" 
                                style={inputStyle} 
                                name='link' 
                                placeholder='Project Live Link (e.g., https://...)' 
                                value={proj.link} 
                                onChange={(e) => handleArrayChange('projects', index, e)} 
                            />
                            <input type="text" style={inputStyle} name='techStack' placeholder='Tech Stack (e.g., Python, Flask, React)' value={proj.techStack} onChange={(e)=>handleArrayChange('projects',index,e)} />
                            <input type="text" style={inputStyle} name='timeline' placeholder='Timeline (e.g., June 2020 - Present)' value={proj.timeline} onChange={(e)=>handleArrayChange('projects',index,e)} />
                            <textarea name="description" style={inputStyle} placeholder='Describe the project. Use a new line for each point.' value={proj.description} onChange={(e) => handleArrayChange('projects', index, e)}></textarea>
                            <button type="button" style={deleteButtonStyle} onClick={() => deleteArrayItem('projects', index)}>Delete Project</button>
                        </div>
                    ))}
                    <button type='button' style={buttonStyle} onClick={()=>addArrayItem('projects')}>Add Project</button>
                </div>
                <div style={{...sectionStyle, borderBottom: 'none'}}>
                    <h2>Technical Skills</h2>
                    <textarea name="languages" style={inputStyle} value={resumedata.skills.languages}  onChange={(e)=>handleChange('skills',e)} placeholder='Languages (e.g., JavaScript, Python)'></textarea>
                    <textarea name="frameworks" style={inputStyle} value={resumedata.skills.frameworks}  onChange={(e)=>handleChange('skills',e)} placeholder='Frameworks (e.g., React, Node.js)'></textarea>
                    <textarea name="tools" style={inputStyle} value={resumedata.skills.tools} onChange={(e)=>handleChange('skills',e)} placeholder='Developer Tools (e.g., Git, Docker)'></textarea>
                    <textarea name="libraries" style={inputStyle} value={resumedata.skills.libraries} onChange={(e)=>handleChange('skills',e)} placeholder='Libraries (e.g., Redux, Pandas)'></textarea>
                </div>
            </div>
        )
    }

    const Showdetails = forwardRef(({resumedata}, ref) => {
        
        const SectionTitle = ({ title }) => (
            <div className="section-title">
                <h3>{title}</h3>
                <hr />
            </div>
        );

        const BulletPoints = ({ text }) => {
            if (!text) return null;
            const points = text.split('\n').filter(point => point.trim() !== '');
            return (
                <ul className="bullet-points">
                    {points.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
            );
        };

        return(
            <div ref={ref} className="resume-preview">
                <div className="resume-header">
                    <h1>{resumedata.personalinfo.username || "Jake Ryan"}</h1>
                    <p>
                        {resumedata.personalinfo.phonenumber || "123-456-7890"} | {resumedata.personalinfo.email || "jake@s.com"} | {resumedata.personalinfo.linkedin || "linkedin.com/in/jake"} | {resumedata.personalinfo.github || "github.com/jake"}
                    </p>
                </div>
                
                <div>
                    <SectionTitle title="Education" />
                    {resumedata.education.map((edu, index) => (
                        <div key={index} className="entry">
                            <div className="entry-header">
                                <strong>{edu.collegename || "Southwestern University"}</strong>
                                <span>{edu.timeline || "Aug. 2018 – May 2021"}</span>
                            </div>
                            <div className="entry-header">
                                <em>{edu.courseName || "Bachelor of Arts in Computer Science"}</em>
                                <span>{edu.location || "Georgetown, TX"}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <SectionTitle title="Experience" />
                    {resumedata.experience.map((exp, index) => (
                        <div key={index} className="entry">
                            <div className="entry-header">
                                    <strong>{exp.role || "Undergraduate Research Assistant"}</strong>
                                    <span>{exp.timeline || "June 2020 – Present"}</span>
                            </div>
                            <div className="entry-header">
                                    <em>{exp.company || "Texas A&M University"}</em>
                                    <span>{exp.location || "College Station, TX"}</span>
                            </div>
                            <BulletPoints text={exp.description} />
                        </div>
                    ))}
                </div>

                <div>
                    <SectionTitle title="Projects" />
                    {resumedata.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '15px' }} className="entry">
                            {/* FIX: Ikkada link logic ni correct place lo pettanu */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="entry-header">
                                    <div style={{fontSize: '14px'}}>
                                        <strong style={{fontWeight:'bold'}}>{proj.name || "Gilytics"}</strong>
                                        | <em style={{fontWeight: 'normal', fontSize: '12px'}}>{proj.techStack || "Python, Flask, React"}</em>
                                        {proj.link && (
                                            <>
                                                {' | '}
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: '#333', fontWeight:'normal'}}>
                                                    Project Link
                                                </a>
                                            </>
                                        )}
                                    </div>
                                <span style={{fontSize: '12px', flexShrink: 0, marginLeft: '10px'}}>{proj.timeline || "June 2020 – Present"}</span>
                            </div>
                            <BulletPoints text={proj.description} />
                        </div>
                    ))}
                </div>
                <div>
                    <SectionTitle title="Technical Skills" />
                    <div className="skills-section">
                        <p> 
                            <strong>Languages:</strong> {resumedata.skills.languages}<br />
                            <strong>Frameworks:</strong> {resumedata.skills.frameworks}<br />
                            <strong>Developer Tools:</strong> {resumedata.skills.tools}<br />
                            <strong>Libraries:</strong> {resumedata.skills.libraries}
                        </p>    
                    </div>
                </div>
            </div>
        )
    });

    export default function App() {

        const blankenteries={
            education:{ collegename:'', courseName:'', location:'', timeline:'' },
            experience:{ company:'', role:'', location: '', timeline:'', description:'' },
            projects:{ name:'', techStack:'', timeline:'', description:'' }
        }
        const SAMPLE_DATA = {
            personalinfo: {
                username: 'Jake Ryan',
                phonenumber: '123-456-7890',
                email: 'jake@su.edu',
                linkedin: 'linkedin.com/in/jake',
                github: 'github.com/jake'
            },
            education: [
                {
                    collegename: 'Southwestern University',
                    courseName: 'Bachelor of Arts in Computer Science, Minor in Business',
                    location: 'Georgetown, TX',
                    timeline: 'Aug. 2018 – May 2021'
                },
                {
                    collegename: 'Blinn College',
                    courseName: 'Associate’s in Liberal Arts',
                    location: 'Bryan, TX',
                    timeline: 'Aug. 2014 – May 2018'
                }
            ],
            experience: [
                {
                    company: 'Texas A&M University',
                    role: 'Undergraduate Research Assistant',
                    location: 'College Station, TX',
                    timeline: 'June 2020 – Present',
                    description: 'Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems\nDeveloped a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data\nExplored ways to visualize GitHub collaboration in a classroom setting'
                },
                {
                    company: 'Southwestern University',
                    role: 'Information Technology Support Specialist',
                    location: 'Georgetown, TX',
                    timeline: 'Sep. 2018 – Present',
                    description: 'Communicate with managers to set up campus computers used on campus\nAssess and troubleshoot computer problems brought by students, faculty and staff\nMaintain upkeep of computers, classroom equipment, and 200 printers across campus'
                },
                {
                    role:'Artificial Intelligence Research Assistant',
                    company:'Southwestern University',
                    location:'Georgetown, TX',
                    timeline:'May 2019 – July 2019',
                    description:'Explored methods to generate video game dungeons based off of The Legend of Zelda\nDeveloped a game in Java to test the generated dungeons\nContributed 50K+ lines of code to an established codebase via Git\nConducted a human subject study to determine which video game dungeon generation technique is enjoyable\nWrote an 8-page paper and gave multiple presentations on-campus\nPresented virtually to the World Conference on Computational Intelligence'
                }
            ],
            projects: [
                {
                    name: 'Gityltics',
                    techStack: 'Python, Flask, React, PostgreSQL, Docker',
                    timeline: 'June 2020 – Present',
                    description: 'Developed a full-stack web app with Flask serving a REST API with React as the frontend\nImplemented GitHub OAuth to get data from user\'s repositories\nVisualized GitHub data to show collaboration'
                },
                {
                    name: 'Simple Paintball',
                    techStack: 'Spigot API, Java, Maven, TravisCI, Git',
                    timeline: 'May 2018 – May 2020',
                    description: 'Developed a Minecraft server plugin to entertain kids during free time for a previous job\nPublished plugin to websites gaining 2K+ downloads and an average 4.5/5-star review\nCollaborated with Minecraft server administrators to suggest features and get feedback about the plugin'
                }
            ],
            skills: {
                languages: 'Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R',
                frameworks: 'React, Node.js, Flask, JUnit, WordPress, FastAPI',
                tools: 'Git, Docker, TravisCI, Google Cloud Platform, VS Code, IntelliJ, Eclipse',
                libraries: 'pandas, NumPy, Matplotlib'
            }
        };
        
        const [resumedata,setResumedata]=useState(SAMPLE_DATA);

        const addArrayItem=(section)=>{
            setResumedata(prevData=>({ ...prevData,[section]:[...prevData[section],blankenteries[section]] }))
        }
        
        const deleteArrayItem=(section,index)=>{
            setResumedata(prevData=>({ ...prevData, [section]:prevData[section].filter((_,i)=> i!==index) }))
        }
        
        const handleArrayChange =(section,index,e)=>{
            const { name, value } = e.target;
            setResumedata(prevData=>{
                const newarray=prevData[section].map((item,i)=>{
                    if(i===index){ return{...item,[name]:value}; }
                    return item;
                })
                return {...prevData,[section]:newarray};
            })
        }

        const handleChange =(section,e)=>{
            const {name,value}=e.target;
            setResumedata(prevData=>({ ...prevData, [section]:{ ...prevData[section], [name]:value } }));
        }   

        const DownloadButton = (
            <div>
                <PDFDownloadLink
                document={<ResumeDocument resumedata={resumedata} />}
                fileName={`${resumedata.personalinfo.username || 'resume'}.pdf`}
                style={{
                    textDecoration: 'none',
                    padding: '10px 15px',
                    color: 'white',
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box',
                    marginTop: '10px'
                }}
                >
                    {({ loading }) =>
                        loading ? 'Generating PDF...' : 'Download as PDF'
                    }
            </PDFDownloadLink>

            </div>
        );

        return (
            <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh', backgroundColor: '#e9e9e9', overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '40px', backgroundColor: '#fdfdfd', overflowY: 'auto', borderRight: '1px solid #ccc' }}>
                    <Filldata 
                        resumedata={resumedata} 
                        handleChange={handleChange} 
                        deleteArrayItem={deleteArrayItem} 
                        addArrayItem={addArrayItem} 
                        handleArrayChange={handleArrayChange}
                        downloadButton={DownloadButton}
                    />
                </div>
                <div style={{ flex: 1, padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto' }}>
                    <div style={{width: '100%', maxWidth: '800px', backgroundColor: 'white'}}>
                        <div style={{ border: '1px solid #ccc', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                            <Showdetails resumedata={resumedata}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
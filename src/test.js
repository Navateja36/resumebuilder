import React from 'react'
import { useState, useRef, forwardRef } from 'react'
import './App.css';


// --- Form Component ---
function Filldata({resumedata, handleChange, addArrayItem, deleteArrayItem, handleArrayChange, handleDownloadPdf}){
    // Form styles remain inline for simplicity as they are part of the form component itself
    const sectionStyle = { marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '25px' };
    const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
    const buttonStyle = { padding: '10px 15px', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' };
    const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#dc3545'};
    const downloadButtonStyle = { ...buttonStyle, backgroundColor: '#28a745', width: '100%', marginTop: '10px', fontSize: '16px'};
    
    return(
        <div>
            <div style={{...sectionStyle, borderBottom: 'none'}}>
                <button style={downloadButtonStyle} onClick={handleDownloadPdf}>Download as PDF</button>
            </div>

            <div style={sectionStyle}>
                <h2>Personal Information</h2>
                <input type="text" style={inputStyle} placeholder='Full Name' name='username' value={resumedata.personalinfo.username} onChange={(e)=>handleChange('personalinfo',e)}/>
                <input type="email" style={inputStyle} placeholder='Email ID' value={resumedata.personalinfo.email} onChange={(e)=>handleChange('personalinfo',e)} name='email'/>
                <input type="number" style={inputStyle} placeholder='Phone Number' value={resumedata.personalinfo.phonenumber}  onChange={(e)=>handleChange('personalinfo',e)} name='phonenumber'/>
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


// --- Preview Component (CSS ni teesesanu) ---
const Showdetails = forwardRef(({resumedata}, ref) => {
    
    // Helper components remain the same
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
            {/* Header Section */}
            <div className="resume-header">
                <h1>{resumedata.personalinfo.username || "Jake Ryan"}</h1>
                <p>
                    {resumedata.personalinfo.phonenumber || "123-456-7890"} | {resumedata.personalinfo.email || "jake@s.com"} | {resumedata.personalinfo.linkedin || "linkedin.com/in/jake"} | {resumedata.personalinfo.github || "github.com/jake"}
                </p>
            </div>
            
            {/* Education Section */}
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

            {/* Experience Section */}
            <div>
              <SectionTitle title="Experience" />
              {resumedata.experience.map((exp, index) => (
                  <div key={index} className="entry">
                      <div className="entry-header">
                          <strong>{exp.company || "Texas A&M University"}</strong>
                          <span>{exp.timeline || "June 2020 – Present"}</span>
                      </div>
                      <div className="entry-header">
                          <em>{exp.role || "Undergraduate Research Assistant"}</em>
                          <span>{exp.location || "College Station, TX"}</span>
                      </div>
                      <BulletPoints text={exp.description} />
                  </div>
              ))}
            </div>

            {/* Projects Section */}
            <div>
              <SectionTitle title="Projects" />
              {resumedata.projects.map((proj, index) => (
                  <div key={index} className="entry">
                      <div className="entry-header">
                          <strong>{proj.name || "Gilytics"} | <em style={{fontWeight: 'normal'}}>{proj.techStack || "Python, Flask, React"}</em></strong>
                          <span>{proj.timeline || "June 2020 – Present"}</span>
                      </div>
                      <BulletPoints text={proj.description} />
                  </div>
              ))}
            </div>

             {/* Skills Section */}
             <div className="skills-section">
                <SectionTitle title="Technical Skills" />
                <p>
                    <strong>Languages:</strong> {resumedata.skills.languages || "Java, Python, C/C++"}<br />
                    <strong>Frameworks:</strong> {resumedata.skills.frameworks || "React, Node.js, Flask"}<br />
                    <strong>Developer Tools:</strong> {resumedata.skills.tools || "Git, Docker, VS Code"}<br />
                    <strong>Libraries:</strong> {resumedata.skills.libraries || "pandas, NumPy, Matplotlib"}
                </p>
             </div>
        </div>
    )
});



// --- Main App Component ---
export default function App() {
    const componentRef = useRef();
    
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const blankenteries={
        education:{ collegename:'', courseName:'', location:'', timeline:'' },
        experience:{ company:'', role:'', location: '', timeline:'', description:'' },
        projects:{ name:'', techStack:'', timeline:'', description:'' }
    }

    const [resumedata,setResumedata]=useState({
        personalinfo:{ username:'', phonenumber:'', email: '', linkedin: '', github: '' },
        education:[blankenteries.education],
        experience: [blankenteries.experience ],
        projects: [ blankenteries.projects],
        skills: { languages: '', frameworks: '', tools: '', libraries: '' }
    });

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

    const handleDownloadPdf = () => {
        const element = componentRef.current;
        const opt = {
          margin:       [0.2, 0.2, 0.2, 0.2],
          filename:     `${resumedata.personalinfo.username || 'resume'}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak:    { mode: 'avoid-all' }
        };

        if (window.html2pdf) {
          window.html2pdf().from(element).set(opt).save();
        } else {
          console.error('html2pdf library not loaded yet');
        }
    };

    return (
        <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh', backgroundColor: '#e9e9e9', overflow: 'hidden' }}>
            <div style={{ flex: 1, padding: '40px', backgroundColor: '#fdfdfd', overflowY: 'auto', borderRight: '1px solid #ccc' }}>
                <Filldata 
                    resumedata={resumedata} 
                    handleChange={handleChange} 
                    deleteArrayItem={deleteArrayItem} 
                    addArrayItem={addArrayItem} 
                    handleArrayChange={handleArrayChange}
                    handleDownloadPdf={handleDownloadPdf}
                />
            </div>
            <div style={{ flex: 1, padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto' }}>
                <div style={{width: '100%', maxWidth: '800px', backgroundColor: 'white'}}>
                    <div style={{ border: '1px solid #ccc', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                        <Showdetails ref={componentRef} resumedata={resumedata}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


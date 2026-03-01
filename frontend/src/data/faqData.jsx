import { NavLink } from "react-router-dom";

const faqData = [
    {
        id:1 ,
        question: "What is the goal of the AI Literacy Toolbox?",
        answer: "The toolbox aims to empower users with knowledge and practical skills to understand and critically engage with AI technologies."
    } ,
    {
        id:2 ,
        question: "Who can benefit from these AI literacy tools?",
        answer: "Students, educators, professionals, and anyone interested in learning about AI can benefit from these interactive tools."
    } ,
    {
        id:3 ,
        question: "How do I submit my own AI tool or game?",
        answer: (
            <>
                You can submit new tools or games through the {" "}<NavLink to='/add-tool'> AddTool </NavLink>{" "}
                page by providing the required information such as title, contact email, type, GitHub link, and description.
            </>
        )
    } ,
    {
        id:4 ,
        question: "Are the tools suitable for beginners in AI?",
        answer: "Yes, many tools are designed to be beginner-friendly, helping users build foundational knowledge and skills in AI."
    } , 
    {
        id:5 ,
        question: "What should I do if a tool is not working correctly?",
        answer: "If you experience issues, try refreshing the page, clearing your browser cache, or using a different browser. If problems persist, please contact us via the form below with a detailed description."
    } , 
    {
        id:6 ,
        question: "Can I use these tools for classroom teaching or workshops?",
        answer: "Absolutely! Our tools are designed to support education and can be used in classrooms, workshops, and self-study settings."
    } ,
    {
        id:7 ,
        question: "How often do you add new tools or update existing ones?",
        answer: "We regularly review submissions and update the toolbox to include new and improved tools to keep the learning experience fresh and relevant."
    } ,
    {
        id:8 ,
        question: "Is there a way to request a specific AI literacy topic or tool?",
        answer: "Yes, you can contact us through the Contact Form and suggest topics or tools you'd like to see added to the toolbox."
    } , 
    {
        id:9 ,
        question: "Can I contribute translations or improvements to existing tools?",
        answer: "We welcome contributions! Please get in touch with us via the Contact Form on this page to discuss how you can help improve or translate the tools."
    }
]

export default faqData;
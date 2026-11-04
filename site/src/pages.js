import {psychotherapyPage, assessmentPage} from './service-pages.js';
import {neuroCourse, personalityCourse} from './course-pages.js';
export const pages = {
 '/cursoneuropsi': {
 title:'Neuropsicologia: Primeiros Passos | Clínica Ludos',
 html:neuroCourse
 },
 '/cursopersonalidadeepsicopatologia':{
 title:'Personalidade e Psicopatologia — inscrições encerradas | Ludos',
 html:personalityCourse
 },
 '/psicoterapiainfantojuvenil':{
 title:'Psicoterapia para crianças e adolescentes | Clínica Ludos',
 html:psychotherapyPage
 },
 '/avaliacaoneuropsicologica':{
 title:'Avaliação neuropsicológica infantojuvenil | Clínica Ludos',
 html:assessmentPage
 }
};

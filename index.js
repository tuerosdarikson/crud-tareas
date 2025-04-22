import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Importa la función para generar UUID
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno
dotenv.config();

// Verifica que las variables estén cargadas correctamente
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Si alguna de las variables no está definida, lanza un error
if (!supabaseUrl || !supabaseKey) {
  throw new Error('supabaseUrl or supabaseKey is missing in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Función para agregar una tarea
async function addTask(task) {
  const userId = uuidv4(); // Genera un UUID válido para el usuario

  const { data, error } = await supabase
    .from('todos')
    .insert([{
      task,
      user_id: userId, // Usa el UUID generado
      created_at: new Date(),
      updated_at: new Date(),
    }]);

  if (error) {
    console.error('Error al agregar tarea:', error);
  } else {
    console.log('Tarea agregada:', data);
  }
}

// Función para obtener todas las tareas
async function fetchTasks() {
  const { data, error } = await supabase
    .from('todos')
    .select('*');

  if (error) {
    console.error('Error al obtener tareas:', error);
  } else {
    console.log('Tareas:', data);
  }
}

// Función para eliminar una tarea
async function deleteTask(taskId) {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', taskId);

  if (error) {
    console.error('Error al eliminar tarea:', error);
  } else {
    console.log('Tarea eliminada:', data);
  }
}

// Función para editar una tarea
async function editTask(taskId, newTask) {
  const { data, error } = await supabase
    .from('todos')
    .update({ task: newTask, updated_at: new Date() })
    .eq('id', taskId);

  if (error) {
    console.error('Error al editar tarea:', error);
  } else {
    console.log('Tarea actualizada:', data);
  }
}

// Ejemplo de uso
(async () => {
  await addTask('Estudiar Node.js');
  await fetchTasks();

  // Edita la tarea con id 1
  await editTask(1, 'Estudiar Node.js y Express');

  // Elimina la tarea con id 1
  await deleteTask(1);
})();

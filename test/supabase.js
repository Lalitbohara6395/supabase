const { createClient } = require("@supabase/supabase-js");


const supabaseUrl = "https://dlnozjyfeadospwsstzq.supabase.co";
const supabaseKey = "sb_publishable_T1QKYul2Ceo3nmsrlCulzw_t2m27Qwi";

const supabase = createClient(supabaseUrl, supabaseKey);

async function getTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*");

  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("Todos Data:", data);
}

getTodos();
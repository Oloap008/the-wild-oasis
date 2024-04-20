import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.log(error.message);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function updateSetting(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Settings could not be updated");
  }

  return data;
}

import jobs from "../seed-data/jobs";
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("jobs").del();
  await knex("jobs").insert(jobs);
}

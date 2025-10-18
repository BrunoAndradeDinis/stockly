export async function GET() {
  const randomNumber = Math.random()
  return Response.json({randomNumber}, {
    status: 200,
  });
}
import { supabase } from '@/supabase';

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    // Make a request to Stability AI
    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/ultra', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`, // Use environment variable
        Accept: 'image/*',
      },
      body: formData,
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Error: ${response.statusText}` }), {
        status: response.status,
      });
    }

    // Handle the response as a binary blob
    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: 'image/webp' });
    const fileName = `generated-image-${Date.now()}.webp`;

    // Upload the image to Supabase
    const { data, error } = await supabase.storage
      .from('fumo_image') // Ensure bucket name matches your configuration
      .upload(fileName, blob, {
        contentType: 'image/webp',
      });

    if (error) {
      console.error('Supabase Upload Error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Failed to upload image to Supabase.' }),
        { status: 500 }
      );
    }

    const publicUrl = supabase.storage.from('fumo_image').getPublicUrl(data.path).data.publicUrl;

    // Respond with the public URL
    return new Response(JSON.stringify({ publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};

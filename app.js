// app.js

// Inicializar localStorage
if (!localStorage.getItem("leads")) {
    localStorage.setItem("leads", JSON.stringify([]));
  }
  
  // Função para abrir modal com formulário
  function abrirFormulario(nomePlano, precoPlano, descricaoItens) {
    Swal.fire({
        title: "Preencha seus dados",
        html: `
            <input id="nome" class="swal2-input" placeholder="Seu nome">
            <input id="empresa" class="swal2-input" placeholder="Nome da empresa">
            <input id="email" class="swal2-input" placeholder="Seu e-mail">
        `,
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        customClass: {
            input: 'w-full p-2 mt-2 border rounded'
        },
        preConfirm: () => {
            const nome = document.getElementById('nome').value.trim();
            const empresa = document.getElementById('empresa').value.trim();
            const email = document.getElementById('email').value.trim();
  
            if (!nome || !empresa || !email) {
                Swal.showValidationMessage(`Por favor, preencha todos os campos`);
                return false;
            }
  
            return { nome, empresa, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const dados = result.value;
  
            // Armazenar lead no localStorage
            const leads = JSON.parse(localStorage.getItem("leads"));
            leads.push({ ...dados, plano: nomePlano, preco: precoPlano });
            localStorage.setItem("leads", JSON.stringify(leads));
  
            // Montar mensagem para WhatsApp
            let mensagem = `Olá! Gostaria de assinar o *${nomePlano}*:\n\n`;
            mensagem += `*Preço:* ${precoPlano}\n`;
            mensagem += `*O que está incluso:*\n${descricaoItens.replace(/,/g, "\n")}\n\n`;
            mensagem += `*Dados do cliente:*\n`;
            mensagem += `- Nome: ${dados.nome}\n`;
            mensagem += `- Empresa: ${dados.empresa}\n`;
            mensagem += `- E-mail: ${dados.email}`;
  
            const urlMensagem = encodeURIComponent(mensagem);
            window.open(`https://wa.me/5547992070167?text= ${urlMensagem}`, '_blank');
  
            // Enviar notificação por e-mail via EmailJS
            emailjs.send("service_seu_id", "template_seu_template", {
                to_email: dados.email,
                subject: `Confirmação de interesse no plano ${nomePlano}`,
                message: mensagem,
                from_name: "Dev Burguer"
            }, "public_key_seu_id")
            .then(() => {
                Swal.fire("Sucesso!", "E-mail enviado com sucesso.", "success");
            })
            .catch((err) => {
                console.error("Erro ao enviar e-mail:", err);
            });
        }
    });
  }
  
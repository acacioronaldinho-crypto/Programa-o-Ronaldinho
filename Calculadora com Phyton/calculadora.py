def somar(a,b):
    return a+b

    def subtrair(a,b):
    return a-b

    def multiplicar(a,b):
    return a*b

    def dividir(a,b):
    if b==0:
        return "Erro: divisão po zero"
        returna/b

        print("selecione a operacao:")
        print("1.Soma")
        print("2.Subtração")
        print("3.Multiplicação")
        print("4.Divisão")

        escolha=input("digite o número da operação(1/2/3/4):")
        num1=float(input("Digite o primeiro número"))
        num2=float(input("Digite o segundo número"))

        if escolha==`1`:
            print("Resultado:", somar(num1,num2))

               elif escolha==`2`:
            print("Resultado:", subtrair(num1,num2))

               elif escolha==`3`:
            print("Resultado:", multiplicar(num1,num2))

               elif escolha==`4`:
            print("Resultado:", dividir(num1,num2))

            else:
                print("Operação inválida")
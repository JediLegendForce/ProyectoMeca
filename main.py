import pandas as pd
import matplotlib.pyplot as plt
import os
import glob

# Funcion unificar CSV
def unificacionCSV(Nmaquina):
    archivo_unificado = os.path.abspath("Registros/Maquina"+Nmaquina+".csv")

    # Verifica si el archivo existe para reemplazarlo
    if os.path.exists(archivo_unificado):
        try:
            os.remove(archivo_unificado)
        except OSError as e:
            print(f"Hubo un error de unificacion. Error: {e}")

    #Buscar el folder de maquina existente (falta validaciones)
    x = os.path.abspath("Registros/M0"+Nmaquina)

    # Almacenar los datos con terminacion "USER.CSV"
    reportes_csv = glob.glob(f'{x}/*USER.CSV')

    # Crear un dataframe para la unificacion
    df_final = pd.DataFrame()

    # Concatenar los archivos csv a uno solo mediante ciclo
    for reporte in reportes_csv:
        df = pd.read_csv(reporte)
        df_final = pd.concat([df_final, df], ignore_index=True)
    
    # Exportar la unificacion como CSV
    df_final.to_csv(archivo_unificado, index=False)
    print("Unificación exitosa.")

    return 0

# Funcion grafica
def graficaCSV(Nmaquina):

    # Leer el archivo unificado
    df_final = pd.read_csv("Registros/Maquina"+Nmaquina+".csv")

    # Agrupar las columnas con Cliente como base
    df_agrupado = df_final.groupby('CLIENTE').agg({'PEDIDOS': 'sum'}).reset_index()

    # Grafica de Pedidos por Cliente
    plt.figure(figsize=(100, 6))
    plt.bar(df_agrupado['CLIENTE'], df_agrupado['PEDIDOS'])
    plt.title('Pedidos por Cliente')
    plt.xlabel('Cliente')
    plt.ylabel('Total de Pedidos')
    plt.show()

    return 0

# Menu consola
def menu():
    opcion = 0

    # Manejado por ciclo
    while opcion != 4:
        print("\n* * * * * M E N U * * * * *")
        print("1. Crear reporte de maquina")
        print("2. Crear una grafica comparativa de una maquina")
        print("3. Crear una grafica comparativa de dos maquina")
        print("4. Salir")

        opcion = int(input("Opcion: "))

        # Opcion de unificacion CSV
        if opcion == 1:
            print("\nCreacion de reporte de maquina\n")
            Nmaquina = input("Ingresar el No. de la maquina a crear: ")
            unificacionCSV(Nmaquina)
        
        # Opcion de grafica y correo electronico para un csv
        elif opcion == 2:
            print("\nGrafica de la maquina\n")
            Nmaquina = input("Ingresar el No. de la maquina a graficar: ")
            graficaCSV(Nmaquina)
            print("\nMaquina graficada\n")
        
        # Opcion de grafica y correo electronico para dos csv
        elif opcion == 3:
            print("\nWIP\n")
        
        # Salir del menu y programa
        elif opcion == 4:
            print("\nFin del programa\n")

    return 0

# Main
menu()
#graficaCSV("2")
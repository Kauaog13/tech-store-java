import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types/models';
import { productService } from '@/services/apiService';
import { toast } from 'sonner';
import { Plus, MoreHorizontal, Pencil, Trash2, Loader2 } from 'lucide-react';

// Categorias pré-definidas para facilitar o cadastro
const CATEGORIAS = [
  'Processador',
  'Placa de Vídeo',
  'Placa Mãe',
  'Memória RAM',
  'Armazenamento',
  'Gabinete',
  'Fonte',
  'Periféricos',
  'Monitor',
  'Refrigeração',
];

export default function AdminEstoquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Estado do formulário incluindo a nova descrição
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    estoque: '',
    categoria: '',
    descricao: '',
    imagemUrl: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        nome: product.nome,
        preco: product.preco.toString(),
        estoque: product.estoque.toString(),
        categoria: product.categoria || '',
        descricao: product.descricao || '',
        imagemUrl: product.imagemUrl,
      });
    } else {
      setEditingProduct(null);
      setFormData({ 
        nome: '', 
        preco: '', 
        estoque: '', 
        categoria: '', 
        descricao: '', 
        imagemUrl: '' 
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({ 
        nome: '', 
        preco: '', 
        estoque: '', 
        categoria: '', 
        descricao: '', 
        imagemUrl: '' 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      nome: formData.nome,
      preco: parseFloat(formData.preco),
      estoque: parseInt(formData.estoque),
      categoria: formData.categoria,
      descricao: formData.descricao,
      imagemUrl: formData.imagemUrl,
    };

    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, productData);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await productService.create(productData);
        toast.success('Produto criado com sucesso!');
      }
      handleCloseDialog();
      loadProducts();
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await productService.delete(id);
      toast.success('Produto excluído com sucesso!');
      loadProducts();
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Estoque</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e estoque</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg"> {/* Aumentado um pouco a largura */}
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações detalhadas do produto abaixo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Produto</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estoque">Estoque (Qtd)</Label>
                    <Input
                      id="estoque"
                      type="number"
                      value={formData.estoque}
                      onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select 
                    value={formData.categoria} 
                    onValueChange={(val) => setFormData({...formData, categoria: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição Detalhada</Label>
                  <Textarea 
                    id="descricao" 
                    rows={4}
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    placeholder="Descreva as especificações técnicas, diferenciais e detalhes do produto..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagemUrl">URL da Imagem</Label>
                  <Input
                    id="imagemUrl"
                    type="url"
                    value={formData.imagemUrl}
                    onChange={(e) => setFormData({ ...formData, imagemUrl: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Atualizar' : 'Criar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">#{product.id}</TableCell>
                  <TableCell>
                    <div className="w-12 h-12 rounded overflow-hidden bg-slate-100 dark:bg-slate-900 border">
                      <img
                        src={product.imagemUrl}
                        alt={product.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={product.nome}>
                    {product.nome}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {product.categoria}
                    </span>
                  </TableCell>
                  <TableCell>R$ {product.preco.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.estoque <= 5
                          ? 'text-destructive font-bold'
                          : product.estoque <= 20 
                            ? 'text-yellow-600 font-medium'
                            : 'text-muted-foreground'
                      }
                    >
                      {product.estoque}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDialog(product)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}